# Web y documentación en el mismo dominio

El `vercel.json` de la raíz usa [Vercel Services](https://vercel.com/docs/services). Las dos aplicaciones Next.js pertenecen a un único proyecto y despliegue:

| URL pública                  | Servicio   | Aplicación      |
| ---------------------------- | ---------- | --------------- |
| `/docs` y `/docs/*`          | `fumadocs` | `apps/fumadocs` |
| Resto de rutas, incluido `/` | `web`      | `apps/web`      |

Las reglas de documentación van antes del catch-all. Vercel conserva la ruta original al entrar en el servicio; Fumadocs usa `basePath: "/docs"`. Por eso `/docs/_next/*`, búsqueda, Markdown y Open Graph llegan a Fumadocs, mientras `/_next/*` pertenece a la web. No añadas `routePrefix` ni cambies a `experimentalServices`: son parte del modelo anterior. Consulta la [referencia de routing](https://vercel.com/docs/services/routing).

## Configuración del proyecto Vercel

- Importa el repositorio completo con **Root Directory** en la raíz, no `apps/web` ni `apps/fumadocs`.
- Usa el framework **Services**. El enlace local `.vercel/project.json` ya registra ese framework; no se versiona.
- Usa Node.js **24.x** y el pnpm fijado en `package.json`.
- Los comandos de instalación y build pertenecen a cada servicio, en `vercel.json`. Cada instalación usa el lockfile de la raíz y cada build ejecuta el script de su aplicación.
- Configura `NEXT_PUBLIC_CONVEX_URL` para el backend de la web. La generación personalizada del preview requiere además `BLOB_READ_WRITE_TOKEN`; los presets publicados no lo requieren.
- Para activar Google Analytics 4 directo, configura `NEXT_PUBLIC_GA_MEASUREMENT_ID` (`G-…`) en **Production**. Para usar Google Tag Manager, configura `NEXT_PUBLIC_GTM_ID` (`GTM-…`) y añade GA4 y los eventos en ese contenedor. Si defines ambos, se carga GTM y no se inicializa GA4 por separado para evitar duplicados. Son identificadores públicos; cada cambio requiere una nueva compilación. Sin esos IDs, los scripts de Google y el aviso de consentimiento quedan desactivados.
- Activa **Vercel Web Analytics** por separado en el proyecto de Vercel. No requiere un ID de Google y no depende del consentimiento para cookies descrito arriba.
- Configura `NEXT_PUBLIC_SITE_URL` con el dominio público completo (`https://tu-dominio.com`) para los metadatos. Fumadocs usa como alternativa las variables de URL de Vercel.
- Añade el dominio al único proyecto Vercel. `/docs/es` y `/docs/pt` sirven los idiomas adicionales.

El indicador npm de Fumadocs consulta `@nest-arch/tui/latest` con revalidación de seis horas. Funciona sin credenciales de Convex. Los comandos y las afirmaciones de compatibilidad de la documentación permanecen fijados a la release revisada.

## Verificar antes de publicar

Las dos apps usan `images.unoptimized: true` en Next.js. En este despliegue, los endpoints `/_next/image` y `/docs/_next/image` devuelven 404, aunque los archivos estáticos originales responden correctamente. Los componentes `Image` sirven esos archivos directamente, conservando sus dimensiones y la carga diferida. Las imágenes se descargan en su tamaño original, sin redimensionado ni conversión automática de formato.

Desde la raíz:

```sh
pnpm deploy:check
pnpm --filter fumadocs build
pnpm --filter fumadocs check-types
pnpm --filter web build
pnpm dev:vercel
```

`deploy:check` ejecuta `vercel deploy --dry`: inspecciona el framework y los archivos sin crear ni subir un despliegue. `dev:vercel` usa `vercel dev -L` para probar los servicios juntos sin autenticación. Revisa en la URL que imprime Vercel la portada, `/docs`, `/docs/es/guides/headless`, la búsqueda y los assets de ambas aplicaciones.

Los servicios usan `pnpm exec next dev` como `devCommand`. Next.js lee el puerto asignado por Vercel desde `PORT`, sin depender de la expansión de `$PORT` en el shell. Esto permite usar el mismo archivo en Windows y Linux.

Para usar solo la documentación, ejecuta `pnpm --filter fumadocs dev`: `http://localhost:4000/` redirige a `/docs`. En el dominio compartido, la raíz pública la atiende `web`.

Cuando decidas publicar, usa el flujo Git de Vercel o `pnpm deploy` para un preview, y `pnpm deploy:prod` para producción. La comprobación local y el dry run no validan un despliegue real ni su DNS.
