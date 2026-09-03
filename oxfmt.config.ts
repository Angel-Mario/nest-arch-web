import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    "apps/web/components.json",
    "apps/web/src/components/ui/**",
    "packages/ui/src/**",
    "packages/backend/convex/**",
    "**/interactive-terminal-wizard.tsx",
  ],
});
