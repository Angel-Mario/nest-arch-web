# Nest Arch documentation app

Fumadocs/Next.js application for Nest Arch. It documents the published `@nest-arch/tui` 0.5.0 release in English, Spanish, and Portuguese. Nest Arch is alpha; see the compatibility guide before relying on a specific integration.

## Development

Run from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm --filter fumadocs dev
```

Open http://localhost:4000/docs. The default language is English; Spanish and Portuguese use `/docs/es` and `/docs/pt`. The application has its own Next.js entry points and runs separately from the marketing website on port 3001. The root Vercel configuration routes `/docs` and its static assets to this service.

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

## Keeping documentation aligned with npm

Follow the [Nest Arch release maintenance guide](../../docs/NEST-ARCH-RELEASES.md) when `@nest-arch/tui` is published. Review option names, validated combinations, generated setup commands and the single-project roadmap against the published source tag. The current docs target `0.5.0`.

The preview automation updates the website's private snapshot and presets. MDX content and product claims require a separate editorial review when features change. See the [website README](../web/README.md) for preview behavior and storage configuration.
