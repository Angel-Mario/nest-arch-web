---
name: erquhart-convex-oss-stats
description: Keep GitHub and npm data for your open source projects synced to your Convex database. Use this skill whenever working with OSS Stats or related Convex component functionality.
---

# OSS Stats

## Instructions

This component automatically syncs GitHub stars, dependencies, and npm download statistics for your open source projects directly into your Convex database. It provides real-time updates via GitHub webhooks and includes React hooks for live download counters. You can track entire organizations or individual repositories and packages, with aggregated statistics and forecasting capabilities.

### Installation

```bash
npm install @erquhart/convex-oss-stats
```

## Use cases

- **Portfolio dashboards** - Display live GitHub star counts and npm download metrics for your open source projects on your personal or company website
- **OSS project analytics** - Track adoption trends across multiple repositories and packages with day-of-week averages and historical data
- **Real-time project monitoring** - Set up automated syncing via webhooks to get instant updates when repositories receive new stars
- **Multi-project aggregation** - Combine statistics from related packages and repositories to show total impact across an entire organization
- **Live download counters** - Use the `useNpmDownloadCounter` hook to display forecasted download counts that update continuously in your UI

## How it works

The component uses GitHub's API with personal access tokens to fetch repository metadata like star counts and dependent counts, while npm statistics are pulled from public npm APIs without authentication. You configure it by specifying `githubOwners`, `npmOrgs`, `githubRepos`, and `npmPackages` in the `OssStats` constructor, then expose the API functions through your Convex backend.

Real-time updates work through GitHub webhooks registered at `/events/github` that trigger automatic data syncing when stars change. For npm data, the component calculates download rate forecasts based on historical patterns. The `useNpmDownloadCounter` React hook provides live-updating download counts with configurable intervals for smooth UI animations.

Data querying happens through standard Convex patterns using `useQuery` on the frontend with functions like `getGithubOwner` and `getNpmOrg`, or directly from backend functions using the `ossStats` client methods. You can also set up manual syncing via cron jobs using the `sync()` function if you prefer not to use webhooks.

## When NOT to use

- When a simpler built-in solution exists for your specific use case
- If you are not using Convex as your backend
- When the functionality provided by OSS Stats is not needed

## Resources

- [npm package](https://www.npmjs.com/package/%40erquhart%2Fconvex-oss-stats)
- [GitHub repository](https://github.com/erquhart/convex-oss-stats)
- [Convex Components Directory](https://www.convex.dev/components/oss-stats)
- [Convex documentation](https://docs.convex.dev)
