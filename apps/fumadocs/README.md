# Nest Arch documentation app

Fumadocs/Next.js application for Nest Arch, including interactive and headless generation, in English, Spanish, and Portuguese. General commands use `@nest-arch/tui@latest`. Every page shows the reviewed release from `src/lib/documented-release.json`. Nest Arch is alpha; see the compatibility guide before relying on a specific integration.

## Development

Run from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm --filter fumadocs dev
```

Open http://localhost:4000/; it redirects to `/docs`. The default language is English; Spanish and Portuguese use `/docs/es` and `/docs/pt`. The Spanish headless guide is at http://localhost:4000/docs/es/guides/headless. The application has its own Next.js entry points and runs separately from the marketing website on port 3001. The root Vercel configuration routes `/docs` and its static assets to this service.

The root redirect is enabled only in development. Production serves documentation at `/docs`, while Vercel routes `/` to the marketing app. The documentation reuses the Nest Arch logo and red accents, with matching light and dark themes.

## Documentation structure

| Path | Purpose |
| --- | --- |
| `content/docs/` | English MDX pages, `.es.mdx` and `.pt.mdx` translations, localized `meta` files |
| `source.config.ts` | Fumadocs collections and frontmatter schema |
| `src/lib/source.ts` | Content loader and page metadata helpers |
| `src/lib/layout.shared.tsx` | Shared layout options |
| `src/app/[lang]/` | Localized pages, search, Markdown and Open Graph routes |

Fumadocs generates content collections during installation. Add documentation under `content/docs` rather than editing generated `.source` files.

## Checks

```bash
pnpm --filter fumadocs check-types
pnpm --filter fumadocs build
```

`types:check` remains available as an alias for `check-types`.

The npm version badge is fetched on the server and revalidated every six hours, without requiring a redeploy or Convex credentials. If npm is unreachable or returns unexpected metadata, it shows the reviewed version with a `docs` label. General commands use `@latest`; project reproduction examples pin the original CLI version. The review note and source/validation links share `src/lib/documented-release.json`. Run the badge's registry and failure tests with `node --import tsx --test apps/fumadocs/src/lib/npm-version.test.ts` from the repository root.

For both Next.js apps on one domain, see [Vercel Services setup](../../docs/VERCEL-SERVICES.md).

## Keeping documentation aligned with npm

Follow the [Nest Arch release maintenance guide](../../docs/NEST-ARCH-RELEASES.md) when `@nest-arch/tui` is published. Review option names, validated combinations, generated setup commands and CLI behavior against the published source tag. The headless guide and CLI reference cover named generation, JSONC configuration, overrides, destination validation, and version-pinned reproduction. Keep all three languages aligned and use relative links between MDX pages so locale and `/docs` prefixes are applied once.

The preview automation updates the website's private snapshot and presets, then proposes the same release in `src/lib/documented-release.json` in its synchronization PR. It also detects an outdated documentation version when the generator is already synchronized. The workflow validates both apps. Review the guides in all three languages and update any affected content in that PR before merging; merging confirms the reviewed version. Historical feature versions and pinned reproduction examples are preserved. See the [website README](../web/README.md) for preview behavior and storage configuration.
