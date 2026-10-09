# Plan de documentación de Nest Arch con Fumadocs

Estado: borrador inicial para implementar por entregas. Fecha de revisión: 2026-10-08.

## Objetivo

Construir la documentación de usuario de Nest Arch en `apps/fumadocs`. La primera entrega debe permitir que alguien conozca la herramienta, ejecute la TUI, elija una configuración compatible y arranque el proyecto generado sin tener que leer el código fuente.

La documentación explicará decisiones, resultados y límites de cada configuración. Los detalles de desarrollo de la web y del motor permanecerán en las guías internas del repositorio, enlazadas cuando corresponda.

Este documento conserva la planificación original y, al final, registra lo implementado en esta entrega y lo que queda pendiente.

## 1. Punto de partida verificado

| Área | Estado observado | Trabajo necesario |
| --- | --- | --- |
| Aplicación | Fumadocs ya existe como aplicación Next.js independiente, en el puerto 4000 | Aprovechar la base existente |
| Dependencias | `fumadocs-core` 16.13.0, `fumadocs-mdx` 15.2.0 y `fumadocs-ui` como alias de `@fumadocs/base-ui` 16.13.0 | Verificar compatibilidad de los ejemplos con estas versiones; actualizar solo si hace falta |
| Contenido | `index.mdx` y `test.mdx` contienen ejemplos de la plantilla | Sustituirlos por documentación del producto |
| Identidad | `src/lib/shared.ts` todavía usa `My App` y el repositorio de Fumadocs | Configurar marca, enlaces y metadatos de Nest Arch |
| Navegación | Existen loader, layout y ruta `/docs` | Crear grupos, orden y páginas mediante MDX y metadatos |
| Búsqueda | Existe `/api/search`, configurado para inglés | Comprobar resultados reales y adaptar cuando se añadan idiomas |
| Lectura por herramientas | Existen `llms.txt`, `llms-full.txt` y rutas de Markdown | Verificar que reflejen las páginas definitivas |
| Web principal | Tiene idiomas `en`, `es`, `pt`; el footer enlaza Documentation a `/{locale}/#docs` | Conectar la documentación real y conservar coherencia de idioma |
| Despliegue | `vercel.json` solo declara el servicio `web`, con una regla general de rewrites | Definir cómo se servirá Fumadocs antes de publicar |
| Generador | El package local de la TUI y el manifest del preview indican 0.5.0 | No usar el número de versión como prueba de que comparten exactamente el mismo código |

Código fuente consultado: `C:/VS/nest-arch`, HEAD `c2d2d29c65b103a49402487d286cb58ad6f3c80e`. Esta referencia identifica la revisión inspeccionada, no una release publicada ni necesariamente todos los cambios del árbol local. No se ha verificado en este trabajo la versión disponible en npm.

Hay diferencias entre los README y el código actual: por ejemplo, el registro `certifiedProfiles` incluye perfiles que algunos README todavía describen como bloqueados. Por eso las afirmaciones de disponibilidad requieren contrastar código, flujo visible, evidencia y release; no basta con copiar un README o enumerar plantillas existentes.

## 2. Fuentes de verdad y control de alcance

Antes de redactar comandos definitivos, escoger la release de `@nest-arch/tui` que cubrirá la documentación y resolver su tag/commit. El checkout local sirve para investigar y preparar borradores; las novedades posteriores a la release se identificarán como próximas o en desarrollo.

| Qué documentar | Fuente primaria en `C:/VS/nest-arch` |
| --- | --- |
| Opciones y etiquetas | `apps/tui/src/constants/createProjectOptions.ts` |
| Orden, pasos condicionales y filtrado | `apps/tui/src/utils/createProjectWizardSteps.ts`, `hooks/useCreateProjectWizard.ts` |
| Menú y navegación | `apps/tui/src/components/MainMenu.tsx`, `components/wizard/`, `screens/` |
| Combinaciones permitidas | `packages/core/src/supportPolicy.ts`, `candidateProfiles.ts`, `compositionRules.ts` |
| Estado de cobertura | `packages/core/src/coverageInventory.ts` y pruebas de los perfiles |
| Archivos y dependencias generados | `packages/core/src/generators/ProjectGenerator/`, `templates/`, `references/package.json` |
| Pasos posteriores a generar | `packages/core/src/projectNextSteps.ts`, `apps/tui/src/components/wizard/DoneStep.tsx` |
| Validación de proyectos | `scripts/run-generated-scenarios.ts`, `scripts/README.md` y resultados disponibles de los escenarios |
| Comportamiento del preview web | Manifest, motor y presets en `apps/web`, junto con `apps/web/PROJECT-PREVIEW.md` de este repositorio |

Para cada guía de una integración, registrar internamente: versión/commit, selección completa, perfil o escenario de respaldo, comandos comprobados y limitaciones. Un perfil certificado no implica que todos sus subconjuntos de extras, addons, adaptadores y formatters estén certificados.

La matriz pública distinguirá: disponible en la release documentada, implementado sin validación suficiente, y planificado. No exponer archivos privados del motor o resultados internos a través del contenido público.

## 3. Estructura de contenido propuesta

Mantener el contenido en `apps/fumadocs/content/docs` y ordenar cada sección con `meta.json`. Los slugs se proponen estables y en inglés; los títulos y textos se adaptarán por idioma.

```text
content/docs/
  index.mdx
  meta.json
  getting-started/
    meta.json
    installation.mdx
    quick-start.mdx
    first-run.mdx
  guides/
    meta.json
    wizard.mdx
    starter-templates.mdx
    web-preview.mdx
    project-structure.mdx
    environment.mdx
  configuration/
    meta.json
    project-and-architecture.mdx
    http-and-api.mdx
    databases-and-orms.mdx
    authentication.mdx
    tooling.mdx
    extras-and-addons.mdx
  reference/
    meta.json
    compatibility.mdx
    cli.mdx
    generated-scripts.mdx
  troubleshooting/
    meta.json
    common-errors.mdx
```

No crear páginas vacías para completar el árbol. Las guías de integración más extensas se dividirán en páginas propias cuando exista contenido y un caso reproducible que las justifique.

### Primera entrega editorial

| Página | Pregunta que resuelve | Contenido mínimo |
| --- | --- | --- |
| Introducción | ¿Qué hace Nest Arch? | Propósito, estado del producto, alcance y enlace al inicio rápido |
| Instalación | ¿Cómo ejecuto la herramienta? | Requisitos de runtime de la release, terminal interactiva, `npx @nest-arch/tui@latest`, instalación global y consulta de versión |
| Inicio rápido | ¿Cómo creo mi primera aplicación? | Un perfil mínimo admitido por la release, selección exacta y resultado esperado |
| Primera ejecución | ¿Cómo arranco lo que se generó? | Instalación omitida o completada, variables necesarias, arranque y comprobación de respuesta |
| Asistente | ¿Cómo navego y qué me pregunta? | Controles comprobados, selección simple/múltiple, pasos condicionales, resumen y generación |
| Compatibilidad | ¿Qué combinaciones puedo usar? | Perfiles verificados, restricciones, versión documentada y enlaces a las guías |
| Errores frecuentes | ¿Qué hago si falla? | Nombre/ruta, instalación, variables y selección incompatible; síntoma, causa y solución |

El inicio rápido comenzará con una API REST mínima, sin base de datos ni autenticación, si la release elegida permite ese perfil. Evitar introducir Docker, migraciones o servicios externos en el primer recorrido. Cada comando debe proceder del proyecto realmente generado, incluido el nombre del script de arranque.

## 4. Etapas de implementación

### Etapa 0 — Fijar el contrato documental

- [ ] Escoger release y registrar tag/commit de origen.
- [ ] Contrastar las opciones visibles con los filtros del wizard y la política del motor.
- [ ] Elaborar una matriz inicial de perfiles exactos y su evidencia.
- [ ] Confirmar requisitos de la CLI y del proyecto generado por separado; no trasladar automáticamente los requisitos de desarrollo de la web.
- [ ] Registrar diferencias entre la release, el checkout local y el snapshot web.
- [ ] Adoptar provisionalmente inglés como idioma base, coherente con la web y el scaffold; preparar español y portugués como entregas posteriores.

Salida: inventario que permita escribir sin prometer funciones que el usuario no puede seleccionar en la release.

### Etapa 1 — Preparar Fumadocs para el producto

- [ ] Sustituir identidad, portada y enlaces de ejemplo por Nest Arch.
- [ ] Configurar títulos, descripciones y enlaces a la web; habilitar enlaces al repositorio solo cuando su visibilidad lo permita.
- [ ] Definir sidebar con `meta.json` y añadir únicamente páginas con contenido útil.
- [ ] Usar los componentes MDX existentes para comandos, pasos, avisos, tablas y tarjetas.
- [ ] Aplicar marca, modo claro/oscuro y navegación móvil conservando los componentes accesibles de Fumadocs.
- [ ] Comprobar búsqueda, tabla de contenido, copia de comandos y representación Markdown.
- [ ] Definir el esquema de URLs para los idiomas futuros antes de añadir traducciones; evitar migraciones innecesarias después de publicar.
- [ ] Elegir el acceso público: `/docs` en el dominio de la web o un dominio dedicado. Propuesta inicial: `/docs`, sujeta a la configuración real de hosting.

Salida: base técnica lista para incorporar contenido y navegar por él.

### Etapa 2 — Completar el recorrido inicial

- [ ] Redactar las siete páginas de la primera entrega editorial.
- [ ] Ejecutar el inicio rápido con la release elegida en un directorio temporal nuevo.
- [ ] Verificar el recorrido con instalación automática y con instalación omitida.
- [ ] Confirmar controles del wizard y capturar imágenes solo cuando ayuden a entender una decisión.
- [ ] Revisar que la primera ejecución coincida con `DoneStep` y los scripts producidos.
- [ ] Añadir referencias cruzadas entre instalación, wizard, compatibilidad y errores.

Salida: documentación mínima completa desde la instalación hasta la aplicación en ejecución.

### Etapa 3 — Explicar las configuraciones disponibles

Implementar en este orden, ajustando el alcance a la release:

1. Express/Fastify y capas REST, tRPC y GraphQL.
2. Bases de datos, ORMs, variables, generación de clientes y migraciones.
3. Autenticación con Passport y Better Auth para perfiles concretos admitidos.
4. Tooling: gestores de paquetes, formatters, Git, Husky y Ultracite.
5. Extras y addons: Docker, health checks, rate limiting, Swagger, Scalar, Todo y nestjs-zod según compatibilidad.
6. Starter templates y diferencias entre la configuración en la web y la generación en la terminal.
7. Microservicios y transportes con evidencia de la release. Documentar límites de entrega, reconexión y manejo de errores cuando se hayan comprobado.

Las páginas de configuración indicarán qué se genera, qué debe configurar el usuario, cómo comprobarlo y qué combinaciones quedan fuera. Monorepos y API Gateway no se presentarán como disponibles mientras el flujo público de la release no los permita.

Salida: guías y referencias que expliquen las decisiones reales del generador.

### Etapa 4 — Integrar, comprobar y preparar publicación

- [ ] Conectar los enlaces de documentación del header/footer y otros puntos de entrada de la web.
- [ ] Revisar el destino del menú Documentation de la TUI; coordinar un cambio en el repositorio del generador si apunta a otra URL.
- [ ] Añadir el servicio o despliegue de Fumadocs y las reglas necesarias, comprobando que la regla general de la web no capture las rutas de documentación.
- [ ] Verificar rutas de página, búsqueda, imágenes OG, recursos estáticos y exports Markdown en el esquema de hosting elegido.
- [ ] Añadir canonical, sitemap y robots coherentes con el dominio público y los idiomas publicados.
- [ ] Revisar navegación por teclado, foco, tablas, contraste y uso en móvil.
- [ ] Ejecutar tipos, build y controles pertinentes; añadir validación de enlaces internos.
- [ ] Integrar los checks en CI y comprobar que se invoca `types:check` del paquete Fumadocs: el script raíz actualmente usa `check-types`.
- [ ] Publicar cuando exista una entrega comprobada y una solicitud de despliegue.

Salida: documentación integrada y verificable en el entorno de publicación.

### Etapa 5 — Traducciones y mantenimiento

- [ ] Incorporar español y portugués con navegación y búsqueda por idioma.
- [ ] Traducir primero el recorrido inicial; mantener slugs equivalentes y evitar enlaces a páginas todavía sin traducir sin un fallback definido.
- [ ] Añadir al procedimiento de releases la revisión de opciones, matriz, comandos y capturas.
- [ ] Mostrar la versión documentada donde ayude al usuario; valorar múltiples versiones solo cuando sea necesario mantener varias releases incompatibles.
- [ ] Automatizar la detección de cambios del contrato del generador y preparar propuestas de actualización; revisar editorialmente las explicaciones.

Salida: documentación que evoluciona junto con el producto, siguiendo la guía interna `docs/NEST-ARCH-RELEASES.md`.

## 5. Criterios de redacción y aceptación

Cada página debe resolver una tarea concreta. Usar títulos claros, pasos reproducibles y términos consistentes con la TUI. Los bloques de shell deben especificar el directorio de ejecución y evitar mezclar comandos del monorepo de desarrollo con los del proyecto generado.

Para una integración: requisitos, selección completa, archivos relevantes, variables con valores de ejemplo seguros, comandos, resultado observable y límites. No incluir credenciales reales ni asumir que los archivos de pruebas automatizadas, como `docker-compose.test.yml`, aparecen en todos los proyectos de usuario.

La entrega inicial se considera terminada cuando:

- Un usuario puede pasar de la instalación a una respuesta de su aplicación siguiendo las páginas.
- El ejemplo funciona con la release documentada y los scripts presentes en su salida.
- No quedan identidad ni contenido de demostración del scaffold en las rutas publicadas.
- Los enlaces internos y la búsqueda encuentran contenido real.
- Ninguna afirmación de compatibilidad depende solo de que exista una plantilla o una opción en una constante.
- La navegación funciona en móvil y con teclado.
- Tipos y build de Fumadocs pasan.

Comandos existentes para validar durante la implementación:

```powershell
# Desde C:/VS/nest-arch-web
pnpm --filter fumadocs types:check
pnpm --filter fumadocs build
pnpm run check
```

Cuando se modifique código, aplicar el formato del repositorio antes de cerrar la entrega. Para cambios limitados a documentación, revisar Markdown/MDX y enlaces sin reformatear archivos ajenos.

## 6. Primer bloque de trabajo recomendado

Empezar por la etapa 0 y una entrega pequeña de las etapas 1–2: identidad de Nest Arch, sidebar inicial, introducción, instalación e inicio rápido. Validar ese recorrido antes de extender la matriz y las guías. Las siguientes entregas completarán primera ejecución, asistente, compatibilidad y errores frecuentes.

No hace falta introducir un CMS, generar documentación de toda la API interna ni ampliar el stack para comenzar. El contenido MDX y la base de Fumadocs ya disponibles permiten trabajar página por página.

## Referencias

- [Fumadocs MDX: colecciones y contenido](https://www.fumadocs.dev/docs/mdx). Fundamenta el uso de contenido MDX y metadatos; contrastar ejemplos con las dependencias instaladas antes de implementar.
- [Fumadocs: convenciones de páginas y navegación](https://preview.fumadocs.dev/docs/page-conventions). Referencia para estructurar slugs y `meta.json`; verificar las convenciones contra la versión del proyecto.
- [README de la aplicación documental](../apps/fumadocs/README.md).
- [Mantenimiento de releases de Nest Arch](./NEST-ARCH-RELEASES.md).

## Estado de implementación

Actualizado después de implementar las etapas autorizadas. La app documental usa el tag publicado `@nest-arch/tui@0.5.0` (`e4c118e4a34e84562ec70d0adc81d23a6efaceb4`) como referencia de opciones y la versión `0.5.0` indicada por el registro npm. El checkout de origen contiene cambios posteriores sin publicar; no se documentaron como capacidades de esta release.

- [x] Inventario y contrato documental para la release 0.5.0.
- [x] Marca, home de documentación, sidebar y rutas de contenido Fumadocs.
- [x] Guías de instalación, inicio rápido, primera ejecución, asistente, estructura, entorno, presets y vista previa.
- [x] Guías de arquitectura, API, bases de datos, autenticación, herramientas y extras.
- [x] Referencia de CLI, scripts, compatibilidad y solución de problemas.
- [x] Contenido y navegación localizados en inglés, español y portugués.
- [x] Rutas localizadas bajo `/docs` para páginas, búsqueda, Markdown para LLM y Open Graph.
- [x] Prefijo de despliegue Next.js `/docs` y regla de rewrites hacia el servicio documental.
- [x] CI de Fumadocs con instalación congelada, tipos y build.
- [x] Servicio Fumadocs y rewrites de documentación en `vercel.json`, sin modificar `apps/web`.
- [x] Comando Turborepo `check-types` para la app documental y generación MDX explícita para comprobar sus tipos.
- [ ] Enlazar header/footer de la web y otros puntos de entrada de producto. Diferido por la instrucción de no modificar `apps/web`.
- [ ] Desplegar y comprobar el dominio. Preparado mediante rewrites; requiere la ejecución normal del despliegue.
- [ ] Completar matriz por cada perfil que vaya a promocionarse. Las guías iniciales enlazan la matriz de escenarios de la release y dejan claro que la disponibilidad de una opción no certifica todas sus combinaciones.
- [ ] Configurar canonical, sitemap y alternate links con el dominio definitivo del sitio.

Validación de la implementación: `pnpm --filter fumadocs lint`, `pnpm exec ultracite check` en los archivos de configuración tocados, `pnpm --filter fumadocs check-types`, `pnpm --filter fumadocs build` y `git diff --check` pasan. La build prerenderiza 173 rutas y solo emite el aviso esperado de `metadataBase` cuando no hay URL de despliegue configurada localmente.
