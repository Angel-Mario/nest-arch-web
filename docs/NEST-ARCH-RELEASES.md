# Actualizar la web después de publicar nest-arch en npm

El paquete que hay que seguir es **`@nest-arch/tui`**, cuya CLI se ejecuta con `npx @nest-arch/tui@latest`.

Hay cuatro actualizaciones distintas:

| Parte | Cómo se actualiza |
| --- | --- |
| Badge de versión npm | Convex consulta `latest` cada 15 minutos (`packages/backend/convex/crons.ts`) |
| Versión revisada de Fumadocs | El workflow propone `apps/fumadocs/src/lib/documented-release.json` en la misma PR; fusionarla confirma la revisión |
| Motor, plantillas y presets del preview | `preview:sync`, seguido de commit y despliegue |
| Opciones y reglas del wizard web | Revisión explícita cuando cambie el contrato del generador |

El badge de npm en Fumadocs consulta directamente el registro desde el servidor y revalida cada seis horas. Los comandos generales de las guías usan `@latest`; los ejemplos para reproducir proyectos fijan la versión original. La nota de versión revisada y los enlaces al código y la validación de la release comparten `documented-release.json`.

Publicar npm no sustituye por sí solo el snapshot que ya está desplegado. La automatización actualiza el generador y propone la versión revisada de la documentación en la misma PR; si una nueva versión cambia opciones o compatibilidad, habrá que adaptar el wizard, su esquema y las guías antes de fusionarla.

## Automatización preparada

El workflow [Sync Nest Arch project previews](../.github/workflows/sync-project-preview.yml) se ejecuta cada seis horas, mediante **Run workflow**, o al recibir `repository_dispatch` con tipo `nest-arch-published`.

Cuando detecta una publicación pendiente:

1. Consulta `@nest-arch/tui@latest` en npm y compara la versión con el snapshot y la última sincronización registrada.
2. Obtiene el código privado del commit `gitHead` de npm, si existe. Si npm no lo incluye, usa el tag `@nest-arch/tui@<versión>`, que coincide con el workflow de publicación del generador.
3. Comprueba que `apps/tui/package.json` tiene el nombre y la versión publicados.
4. Ejecuta `preview:sync` para actualizar el motor privado, plantillas, manifest y presets, y `sync-docs-version.mjs` para proponer la misma versión en Fumadocs. El script rechaza versiones distintas del generador, prereleases y degradaciones.
5. Ejecuta los tests, tipos, Ultracite y builds de la web y Fumadocs.
6. Registra la publicación en `apps/web/src/lib/project-preview/generated/release.json` y crea o actualiza una PR en `automation/nest-arch-preview`.

El workflow no degrada un snapshot de desarrollo a una versión npm anterior. Solo sigue versiones estables de `latest`; para prereleases usa el procedimiento manual. Si una publicación rompe la compatibilidad del adaptador, falla antes de abrir la PR.

Aunque el generador ya esté sincronizado, una versión revisada de documentación anterior activa la PR. Antes de fusionarla, revisa las guías en los tres idiomas contra la release propuesta y actualiza el contenido afectado. La automatización cambia la referencia de versión; la aprobación de la PR confirma la revisión del contenido. Los números históricos de introducción de funciones y los ejemplos de reproducción no se reemplazan automáticamente.

### Configuración inicial en GitHub

Configura lo siguiente en **nest-arch-web**:

| Configuración | Valor |
| --- | --- |
| Visibilidad del repositorio | Privado, porque contiene el snapshot del generador privado |
| Actions → Variables → `NEST_ARCH_PREVIEW_AUTO_SYNC` | `true` |
| Actions → Secrets → `NEST_ARCH_SOURCE_TOKEN` | Token con acceso de lectura a `Angel-Mario/nest-arch`; un token granular necesita **Contents: Read** |
| Actions → General → Workflow permissions | Habilitar **Allow GitHub Actions to create and approve pull requests** |

El token de lectura del generador no se utiliza para escribir en él. La PR de la web usa su `GITHUB_TOKEN` con permisos de contenido y pull requests. El workflow tiene que estar en la rama predeterminada para que funcionen el cron y el dispatch. No se han creado secretos ni activado Actions desde el entorno local.

Después de configurar, ejecuta **Actions → Sync Nest Arch project previews → Run workflow** para comprobar acceso, tag y generación. Revisa y fusiona la PR; la integración Git habitual de Vercel realiza el despliegue. La fusión y el despliegue no se fuerzan desde este workflow. Revisa las comprobaciones requeridas de GitHub y el preview de Vercel según la configuración del repositorio.

### Actualización inmediata después de publicar

El cron evita depender de cambios en el generador y añade como máximo el intervalo de comprobación, salvo retrasos de GitHub. Para una sincronización inmediata, añade después del paso **Publish to npm** en `C:/VS/nest-arch/.github/workflows/publish.yml`:

```yaml
- name: Notify website of published generator
  env:
    GH_TOKEN: ${{ secrets.NEST_ARCH_WEB_DISPATCH_TOKEN }}
  run: |
    gh api --method POST repos/Angel-Mario/nest-arch-web/dispatches \
      -f event_type=nest-arch-published
```

Ese secreto se configura en el repositorio del generador y necesita permiso **Contents: Write** en `nest-arch-web` para enviar `repository_dispatch`. El workflow web vuelve a consultar npm; no confía en una versión enviada en el evento. El cron sirve como recuperación si la notificación falla o npm aún no refleja `latest`. El paso anterior está documentado, pero el repositorio del generador no se ha modificado.

## Procedimiento manual en Windows

Ejecuta desde `C:/VS/nest-arch-web`. Usa el tag publicado, con un worktree separado para preservar tus cambios locales del generador:

```powershell
$releaseVersion = (Invoke-RestMethod 'https://registry.npmjs.org/@nest-arch%2Ftui/latest').version
$sourceCheckout = "C:\VS\nest-arch-release-$releaseVersion"
git -C C:\VS\nest-arch fetch origin --tags
git -C C:\VS\nest-arch worktree add --detach $sourceCheckout "@nest-arch/tui@$releaseVersion"
pnpm install --frozen-lockfile
pnpm --filter web preview:sync $sourceCheckout
pnpm --filter web test:preview
pnpm --filter web check-types
pnpm check
pnpm --filter web build
```

Si el worktree ya existe, reutilízalo después de comprobar que apunta al tag correcto. Para previsualizar cambios todavía no publicados, usa `pnpm --filter web preview:sync C:/VS/nest-arch`; ese snapshot puede diferir de npm y debe revisarse como tal.

Comprueba en el navegador el preset básico y las configuraciones afectadas por el release: nuevos archivos, base de datos, ORM, autenticación y transportes. Si hay nuevas opciones, revisa:

- `apps/web/src/app/_components/interactive-terminal-wizard.tsx`.
- `apps/web/src/lib/project-preview/config.ts` y `client.ts`.
- `apps/web/src/server/project-preview/generate.ts`.
- Los presets de `apps/web/scripts/sync-project-preview.mts`, la landing y el roadmap.

Incluye juntos en el commit:

```text
apps/web/private/nest-arch/
apps/web/src/lib/project-preview/generated/manifest.json
apps/web/public/project-previews/<nueva-versión-con-hash>/
```

Cuando sincronices manualmente una publicación estable, puedes registrar también el estado de automatización, para que el cron no repita la misma sincronización:

```powershell
node .github/scripts/check-preview-release.mjs
node .github/scripts/check-preview-release.mjs record
```

Ejecuta ambos comandos seguidos después de sincronizar desde el tag publicado y solo si el primero devuelve `should_sync=true`. Incluye el `generated/release.json` resultante en el commit. Si npm ya avanzó a otra versión, el registro rechazará la discrepancia; sincroniza esa publicación antes de repetirlo.

Después, fusiona y despliega mediante el flujo habitual. No hace falta purgar Blob ni las cachés del navegador: el nuevo digest produce otras URLs y claves. Mantén los assets de releases anteriores durante su vida de caché; evita borrar presets todavía utilizados por despliegues anteriores.

## Vercel y rollback

La detección de npm y la regeneración de presets ocurren en GitHub Actions. Los seis presets publicados no ejecutan la función de generación. Las combinaciones personalizadas necesitan un Blob público con `BLOB_READ_WRITE_TOKEN`: los aciertos de CDN evitan la función y los de Blob evitan regenerar. La primera petición de una combinación en una versión nueva puede generar otro archivo; el cambio de versión invalida por namespace, no por borrado.

Para volver atrás, restaura o redespliega el commit anterior completo, con su snapshot, manifest y presets. No edites el contenido de una URL publicada como inmutable. Más detalles en [PROJECT-PREVIEW.md](../apps/web/PROJECT-PREVIEW.md).

Referencias: [eventos de GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows), [creación automática de PR](https://github.com/peter-evans/create-pull-request).
