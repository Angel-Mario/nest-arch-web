# Interactive Terminal Wizard Component Implementation Plan

Create a dedicated interactive Terminal Wizard component for the hero section of the landing page, replicating the exact UX and step flow of the real Nest Arch CLI wizard (`apps/tui/src`), fully interactive on web (keyboard + mouse), with simulated generation progress and a DEMO badge.

## User Review Required

> [!NOTE]
>
> - The component will support both **keyboard controls** (Arrow keys, Enter, Space, Backspace/Ctrl+B) and **mouse clicks/taps** for maximum accessibility on desktop and mobile.
> - A "DEMO" badge will be placed in the terminal top corner.
> - Once reaching the "installing" step, it will run a fast simulated scaffolding animation through all the real generation stages and show the final "Done" screen with Next Steps, with an option to restart the demo at any time.

---

## Proposed Changes

### Web Application (`apps/web`)

#### [NEW] [interactive-terminal-wizard.tsx](file:///c:/VS/nest-arch-web/apps/web/src/app/_components/interactive-terminal-wizard.tsx)

- Create the standalone client component `InteractiveTerminalWizard`.
- Implement full step-state engine mirroring `useCreateProjectWizard` and `createProjectWizardSteps.ts`:
  1. **Project Name** (`projectName`): interactive text input with default placeholder (`my-nest-project`) and real-time validation.
  2. **Package Manager** (`packageManager`): `pnpm` (default), `npm`, `yarn`, `bun`.
  3. **Formatter** (`formatter`): `Biome`, `Oxlint + Oxfmt`, `(None)`.
  4. **HTTP Provider** (`httpProvider`): `Express`, `Fastify`.
  5. **Project Layout** (`projectType`): `Single project`, `Monorepo (Turborepo)`.
  6. **Architecture** (`architecture`): `NestJS API`, `NestJS API Gateway` (if monorepo), `NestJS Microservice`.
  7. **Database** (`database`): `No database`, `PostgreSQL`, `MySQL`, `Better SQLite`, `MongoDB`.
  8. **ORM** (`orm`): `Prisma`, `TypeORM`, `Drizzle` (conditionally shown if DB is selected and filtered for MongoDB).
  9. **API Layer** (`apiLayer`): `REST`, `tRPC`, `GraphQL` (filtered when no database).
  10. **Authentication** (`auth`): `None`, `Passport`, `Better Auth`, `Better Auth (Stateless)`.
  11. **Extras** (`extras`): `Docker`, `Health Check`, `Rate Limiting`, `Swagger`, `packages/shared`, `Todo Example`, `TypeScript 7`.
  12. **Microservices** (`microservices`): shown only if architecture is `nest-gateway` (`Redis`, `MQTT`, `NATS`, `RabbitMQ`, `Kafka`, `gRPC`).
  13. **Addons** (`addons`): `Agent Skills`, `Husky`, `Ultracite`, `Scalar UI`.
  14. **Ultracite Sub-steps** (if Ultracite addon is selected):
      - `ultraciteEditors`: `Universal`, `Zed`.
      - `ultraciteAgents`: `.agents (Universal)`, `Claude`, `Replit`, `Aider`, `Gemini`, `Roo`, etc.
      - `ultraciteHooks`: `Cursor`, `Windsurf`, `CodeBuddy`, `Claude`.
      - `ultraciteInstallSkill`: `Yes`, `No`.
  15. **Git Init** (`initGit`): `Yes`, `No`.
  16. **Install Dependencies** (`installDependencies`): `Yes (Recommended)`, `No`.
  17. **Summary** (`summary`): Formatted review table matching `SummaryStep.tsx` with all user selections.
  18. **Simulated Scaffolding** (`installing`): Animated stage progression (`generate-files`, `install-agent-skills`, `setup-linter`, `initialize-git`, `initial-commit`, `install-dependencies` with percentage bar, `run-formatter`, `formatter-commit`) with bouncy ASCII ball / spinner.
  19. **Done Step** (`done`): Formatted completion card matching `DoneStep.tsx` with `cd <projectName>`, package manager commands, and a button / keypress to restart the interactive demo.
- Recreate the UI chrome of the real TUI:
  - Header: `◆ Create a new NestJS project` + context breadcrumbs box (`Project Name: ... Selected: ...`)
  - Title: `Create project — step X/Y · [Step Name]`
  - Corner **DEMO** badge (with pulsing dot or sleek styling)
  - Bottom Status bar: interactive navigation hints + Back button
  - Option items with red cursor (`>`), hover highlight, checkbox glyphs (`●` / `○`), and descriptions.

#### [MODIFY] [hero-section.tsx](file:///c:/VS/nest-arch-web/apps/web/src/app/_components/hero-section.tsx)

- Remove inline static terminal mock lines 57-121.
- Import and render `<InteractiveTerminalWizard />`.
- Clean up unused icon imports if no longer needed directly in `hero-section.tsx`.

---

## Verification Plan

### Automated Checks

- Run Ultracite / Oxlint & TypeScript typecheck:
  ```powershell
  pnpm dlx ultracite check
  pnpm --filter web check-types
  ```

### Manual & Interactive Verification

- Start development server or run checks:
  ```powershell
  pnpm --filter web build
  ```
- Test navigating through all steps using both keyboard (Arrow keys, Space, Enter, Backspace) and mouse clicks.
- Test step branches:
  - Selecting `Monorepo` enables `NestJS API Gateway`, which reveals the `Microservices` step.
  - Selecting `Ultracite` addon triggers the 4 Ultracite configuration sub-steps.
  - Skipping Database skips the ORM step.
  - Reviewing the Summary step and triggering the simulated generation animation to completion.
- Verify responsiveness across screen sizes.
