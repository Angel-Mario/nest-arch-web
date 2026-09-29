# Website analytics

Production domain: https://nest-arch.vercel.app

## Vercel

The locale layout mounts `Analytics` from `@vercel/analytics/next` once. Enable Web Analytics for this Vercel project, then deploy. Development uses the SDK's development mode. GA consent does not control Vercel's cookie-free page-view analytics.

## Google Analytics 4

Create a GA4 property and web data stream for the production domain. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-…` in the Vercel **Production** environment, then rebuild/redeploy. This is a public identifier, not a secret. An absent value disables GA and its consent prompt. Invalid values fail environment validation.

Leave this variable unset for Development and Preview. To test, explicitly configure a separate test property's ID. Next.js embeds public environment variables at build time; changing an ID requires a new build. Turborepo automatically includes `NEXT_PUBLIC_*` variables in the Next.js build environment and cache hash.

Enable enhanced measurement's browser-history page changes. Do not add a manual page-view effect alongside it. Check initial loads, client navigation, locale changes, and back/forward for exactly one page view per navigation. Disable automatic form interactions and site search since this site only needs page views and the events below. Do not put personal information into URLs or campaign parameters.

GA loads only after acceptance. The localized footer preferences persist acceptance/rejection in localStorage for 180 days. Withdrawal disables GA immediately, clears its cookies, and reloads to unload the script. Other tabs receive preference changes; expiry is checked every minute while the page remains open. Browser storage failures are shown to the visitor and never grant consent. The localized `/en/privacy`, `/es/privacy`, and `/pt/privacy` pages explain both providers.

| Event | Trigger | Parameters |
| --- | --- | --- |
| `demo_start` | Open demo | `locale`, `placement` (`hero` or `terminal`) |
| `demo_complete` | Simulated wizard finishes | `locale` |
| `cta_click` | Banner/footer npm or GitHub link | `locale`, `placement`, `destination` |

These are website interactions, not actual installations or GitHub stars. No free-text wizard values are sent. Register the event parameters as event-scoped custom dimensions if needed for reporting. Choose relevant events as GA4 key events in the property settings.

## Verification

- Run `pnpm exec ultracite check` on changed files, `pnpm --filter web check-types`, and `pnpm --filter web build`.
- With a test ID, confirm there are no Google scripts, requests, or cookies before consent or after rejection.
- Accept and verify one Google script, one initial page view, and the events above using Tag Assistant / GA4 DebugView. Enable debug mode only for test sessions.
- Reload and change language; confirm consent persists. Reject from footer preferences and verify scripts/cookies disappear after reload, including in another open tab.
- Verify the site still works with storage blocked, analytics blocked, and with no GA ID configured.
- After deployment, verify Vercel page views and GA4 Realtime with an accepted session. Dashboard verification requires access to the respective projects.
