import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, react, next],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    "apps/web/components.json",
    "apps/web/src/components/ui/**",
    "packages/ui/src/**",
    "packages/convex/**",
    "**/interactive-terminal-wizard.tsx",
  ],
  rules: {
    complexity: ["error", 50],
  },
});
