# Nest Arch website

Next.js application for the landing page, single-app wizard, roadmap and real project file explorer. Monorepo generation is planned for v2. The preview renders the private generator's initial output; it does not run the generated application.

## Local development

From the repository root:

```bash
pnpm install --frozen-lockfile
pnpm dev:setup
pnpm dev:web
```

Set `NEXT_PUBLIC_CONVEX_URL` in `apps/web/.env` to your Convex deployment URL. Optional analytics and verification variables are defined in `packages/env/src/web.ts`. The website runs at http://localhost:3001.

## Project previews

The explorer opens from the hero section and the wizard summary. It supports file search, Material Icon Theme icons, syntax highlighting in light/dark themes, decorative line numbers, local project-name substitution and file copying.

Six presets are pregenerated and served as static JSON. Custom configurations use the Node.js API at `/api/project-preview`, backed by a private snapshot in `private/nest-arch`. Generated files are public example output; source templates and engine code remain server-only.

| Environment | Custom preview storage |
| --- | --- |
| Local development | `.cache/project-previews` on disk |
| Vercel/production | Public Blob store with server-only `BLOB_READ_WRITE_TOKEN` |
| Production without Blob | Custom previews return 503; static presets remain available |

The cache namespace includes the CLI version and a digest of the generator, templates and preview adapter. Name changes do not invalidate it. Syntax highlighting runs in the browser and does not invoke the backend. See [PROJECT-PREVIEW.md](PROJECT-PREVIEW.md) for the complete architecture and output limitations.

## Publishing a new generator version

Use the [maintainer release guide](../../docs/NEST-ARCH-RELEASES.md). It documents both manual synchronization from `C:/VS/nest-arch` and the GitHub Actions automation that checks npm and prepares a snapshot PR.

The live npm badge and the preview snapshot have independent update paths. Updating the badge does not update the wizard's options or generated files. New options require review of the web wizard and preview schema.

## Validation

```bash
pnpm --filter web test:preview
pnpm --filter web check-types
pnpm check
pnpm --filter web build
```

Deploy from the repository's existing Vercel configuration. Commit the private snapshot, generated manifest and static previews together; the deployment does not require access to the CLI source repository.
