# Nest Arch Convex backend

Convex functions used by the Nest Arch website for npm version metadata and the OSS Stats integration.

## Local setup

From the repository root:

```bash
pnpm dev:setup
pnpm dev:server
```

Set the resulting deployment URL as `NEXT_PUBLIC_CONVEX_URL` in `apps/web/.env`. Use the existing Convex deployment configuration for production.

## npm version synchronization

`crons.ts` registers `syncPackageVersionJob` every six hours. It reads the `latest` dist-tag of `@nest-arch/tui`, writes the `npmPackageVersions` record, and exposes it through `getLatestNpmPackageVersion` for the website badge.

This cron updates version metadata. The project explorer's engine, templates and static presets are updated separately by the GitHub Actions workflow described in the [release maintenance guide](../../../docs/NEST-ARCH-RELEASES.md).

## Project previews

Generation and persistent preview caching live in `apps/web`, through its Next.js API and Vercel Blob storage. Convex is not the preview cache. See the [website README](../../../apps/web/README.md) and [preview architecture](../../../apps/web/PROJECT-PREVIEW.md).

## Integrations

`ossStats.ts` configures the OSS Stats component. `http.ts` registers its HTTP routes, and `schema.ts` defines the application's Convex tables. Keep integration credentials in the deployment's environment configuration.
