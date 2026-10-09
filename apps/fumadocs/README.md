# Nest Arch documentation app

Fumadocs/Next.js application in the Nest Arch workspace. Documentation development is currently private; the generator's v1 scope is single applications, with monorepos planned for v2.

## Development

Run from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm --filter fumadocs dev
```

Open http://localhost:4000. This app has its own Next.js entry points and is separate from the marketing website on port 3001.

## Documentation structure

| Path                        | Purpose                                     |
| --------------------------- | ------------------------------------------- |
| `content/docs/`             | MDX documentation pages                     |
| `source.config.ts`          | Fumadocs collections and frontmatter schema |
| `src/lib/source.ts`         | Content loader and page metadata helpers    |
| `src/lib/layout.shared.tsx` | Shared layout options                       |
| `src/app/docs/`             | Documentation pages and layout              |

Fumadocs generates content collections during installation. Add documentation under `content/docs` rather than editing generated `.source` files.

## Checks

```bash
pnpm --filter fumadocs types:check
pnpm --filter fumadocs build
```

## Keeping documentation aligned with npm

Follow the [Nest Arch release maintenance guide](../../docs/NEST-ARCH-RELEASES.md) when `@nest-arch/tui` is published. Review option names, certified combinations, generated setup commands and the single-app/v2 roadmap against the published source tag.

The preview automation updates the website's private snapshot and presets. MDX content and product claims require a separate editorial review when features change. See the [website README](../web/README.md) for preview behavior and storage configuration.
