"use client";

import {
  ArrowLeft,
  Check,
  ChevronRight,
  Minimize2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import * as React from "react";

// ==========================================
// Types & Interfaces
// ==========================================

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";
export type FormatterOption = "biome" | "oxlint-oxfmt" | "none";
export type HttpProvider = "express" | "fastify";
export type ProjectType = "single" | "monorepo";
export type Architecture = "nest-api" | "nest-gateway" | "nest-microservice";
export type Database = "postgresql" | "mysql" | "sqlite" | "mongodb";
export type Orm = "prisma" | "typeorm" | "drizzle";
export type ApiOption = "rest" | "trpc" | "graphql";
export type AuthOption =
  | "none"
  | "passport"
  | "better-auth"
  | "better-auth:stateless";
export type ExtraOption =
  | "docker"
  | "health-check"
  | "rate-limiting"
  | "swagger"
  | "packages/shared"
  | "todo-example"
  | "typescript-7";
export type AddonOption = "agent-skills" | "husky" | "ultracite" | "scalar-ui";
export type MicroserviceOption =
  | "redis"
  | "mqtt"
  | "nats"
  | "rabbitmq"
  | "kafka"
  | "grpc";
export type UltraciteEditor = "universal" | "zed";
export type UltraciteAgent =
  | "universal"
  | "claude"
  | "replit"
  | "aider"
  | "gemini"
  | "roo-code"
  | "amazon-q-cli"
  | "firebender";
export type UltraciteHook = "cursor" | "windsurf" | "codebuddy" | "claude";
export type UltraciteInstallSkill = "yes" | "no";
export type InitGitOption = "yes" | "no";
export type InstallDependencyOption = "yes" | "no";

export type WizardStepId =
  | "projectName"
  | "packageManager"
  | "formatter"
  | "httpProvider"
  | "projectType"
  | "architecture"
  | "database"
  | "orm"
  | "apiLayer"
  | "auth"
  | "extras"
  | "microservices"
  | "addons"
  | "ultraciteEditors"
  | "ultraciteAgents"
  | "ultraciteHooks"
  | "ultraciteInstallSkill"
  | "initGit"
  | "installDependencies"
  | "summary"
  | "installing"
  | "done";

export interface WizardOption<T extends string = string> {
  description: string;
  label: string;
  value: T;
  devOnly?: boolean;
}

export interface CreateProjectWizardState {
  projectName: string;
  packageManager: PackageManager | null;
  formatter: FormatterOption | null;
  httpProvider: HttpProvider | null;
  projectType: ProjectType | null;
  architecture: Architecture | null;
  database: Database[];
  orm: Orm[];
  api: ApiOption[];
  auth: AuthOption | null;
  extras: ExtraOption[];
  microservices: MicroserviceOption[];
  addons: AddonOption[];
  ultraciteEditors: UltraciteEditor[];
  ultraciteAgents: UltraciteAgent[];
  ultraciteHooks: UltraciteHook[];
  ultraciteInstallSkill: UltraciteInstallSkill | null;
  initGit: InitGitOption | null;
  installDependencies: InstallDependencyOption | null;
}

// ==========================================
// Constants & Options
// ==========================================

const DEFAULT_PROJECT_NAME = "my-nest-app";
const MAX_PROJECT_NAME_LENGTH = 64;
const PROJECT_NAME_PATTERN = /^[a-z][a-z0-9-]*$/u;

const PACKAGE_MANAGER_OPTIONS: WizardOption<PackageManager>[] = [
  {
    description: "Fast, disk-efficient package manager (recommended)",
    label: "pnpm",
    value: "pnpm",
  },
  {
    description: "Default Node.js package manager",
    label: "npm",
    value: "npm",
  },
  {
    description: "Classic alternative with workspaces support",
    label: "yarn",
    value: "yarn",
  },
  {
    description: "A superfast Node.js-compatible package manager",
    label: "bun",
    value: "bun",
  },
];

const FORMATTER_OPTIONS: WizardOption<FormatterOption>[] = [
  {
    description: "The modern, all-in-one toolchain written in Rust",
    label: "Biome",
    value: "biome",
  },
  {
    description: "The fastest linter available, 50-100x faster than ESLint",
    label: "Oxlint + Oxfmt",
    value: "oxlint-oxfmt",
  },
  {
    description: "No formatter and no linter. Welcome to the jungle",
    label: "(None)",
    value: "none",
  },
];

const HTTP_PROVIDER_OPTIONS: WizardOption<HttpProvider>[] = [
  {
    description: "Default NestJS HTTP adapter",
    label: "Express",
    value: "express",
  },
  {
    description: "High-performance HTTP adapter",
    label: "Fastify",
    value: "fastify",
  },
];

const PROJECT_TYPE_OPTIONS: WizardOption<ProjectType>[] = [
  {
    description: "Standalone NestJS application",
    label: "Single project",
    value: "single",
  },
  {
    description: "Multiple apps and shared packages",
    label: "Monorepo (Turborepo)",
    value: "monorepo",
  },
];

const ARCHITECTURE_OPTIONS: WizardOption<Architecture>[] = [
  {
    description: "Standard REST or GraphQL API application",
    label: "NestJS API",
    value: "nest-api",
  },
  {
    description: "Gateway routing for microservices (monorepo only)",
    label: "NestJS API Gateway",
    value: "nest-gateway",
  },
  {
    description: "Message-based or RPC microservice",
    label: "NestJS Microservice",
    value: "nest-microservice",
  },
];

const DATABASE_OPTIONS: WizardOption<Database>[] = [
  {
    description: "Relational database with strong ecosystem",
    label: "PostgreSQL",
    value: "postgresql",
  },
  {
    description: "Popular relational database",
    label: "MySQL",
    value: "mysql",
  },
  {
    description: "Embedded database for local development",
    label: "Better SQLite",
    value: "sqlite",
  },
  {
    description: "Document database",
    label: "MongoDB",
    value: "mongodb",
  },
];

const ORM_OPTIONS: WizardOption<Orm>[] = [
  {
    description: "Type-safe ORM with schema and migrations",
    label: "Prisma",
    value: "prisma",
  },
  {
    description: "Decorator-based ORM for TypeScript",
    label: "TypeORM",
    value: "typeorm",
  },
  {
    description: "Lightweight SQL ORM",
    label: "Drizzle",
    value: "drizzle",
  },
];

const API_OPTIONS: WizardOption<ApiOption>[] = [
  {
    description: "RESTful HTTP endpoints",
    label: "REST",
    value: "rest",
  },
  {
    description: "End-to-end typesafe APIs",
    label: "tRPC",
    value: "trpc",
  },
  {
    description: "GraphQL schema and resolvers",
    label: "GraphQL (Code first)",
    value: "graphql",
  },
];

const AUTH_OPTIONS: WizardOption<AuthOption>[] = [
  {
    description: "No authentication scaffolding",
    label: "None",
    value: "none",
  },
  {
    description:
      "Flexible authentication — stateless when no database, ORM-backed when database selected",
    label: "Passport",
    value: "passport",
  },
  {
    description: "Modern auth library with database-backed sessions",
    label: "Better Auth",
    value: "better-auth",
  },
  {
    description:
      "Better Auth without a database — OAuth session data stored in signed cookies",
    label: "Better Auth (Stateless)",
    value: "better-auth:stateless",
  },
];

const EXTRA_OPTIONS: WizardOption<ExtraOption>[] = [
  {
    description: "Dockerfile and docker-compose setup",
    label: "Docker",
    value: "docker",
  },
  {
    description: "Terminus health check endpoints",
    label: "Health Check",
    value: "health-check",
  },
  {
    description: "Request throttling middleware",
    label: "Rate Limiting",
    value: "rate-limiting",
  },
  {
    description: "OpenAPI documentation",
    label: "Swagger",
    value: "swagger",
  },
  {
    description: "Shared packages for API types in a monorepo",
    label: "packages/shared",
    value: "packages/shared",
  },
  {
    description: "Scaffold a Todo CRUD module example (GraphQL only)",
    label: "Todo Example",
    value: "todo-example",
  },
  {
    description: "Latest TypeScript compiler with enhanced checking",
    label: "TypeScript 7",
    value: "typescript-7",
  },
];

const ADDON_OPTIONS: WizardOption<AddonOption>[] = [
  {
    description: "Cursor agent skills library (.agents/skills)",
    label: "Agent Skills",
    value: "agent-skills",
  },
  {
    description: "Git hooks for pre-commit checks",
    label: "Husky",
    value: "husky",
  },
  {
    description: "Configure ultracite for your developer tools",
    label: "Ultracite",
    value: "ultracite",
  },
  {
    description: "Modern OpenAPI documentation UI",
    label: "Scalar UI (Recommended)",
    value: "scalar-ui",
  },
];

const MICROSERVICE_OPTIONS: WizardOption<MicroserviceOption>[] = [
  {
    description: "Pub/sub or streaming protocol",
    label: "Redis",
    value: "redis",
  },
  {
    description: "Lightweight MQTT messaging",
    label: "MQTT",
    value: "mqtt",
  },
  {
    description: "Cloud-native messaging broker",
    label: "NATS",
    value: "nats",
  },
  {
    description: "Enterprise messaging with RabbitMQ",
    label: "RabbitMQ",
    value: "rabbitmq",
  },
  {
    description: "Highly scalable Kafka streaming",
    label: "Kafka",
    value: "kafka",
  },
  {
    description: "RPC-style gRPC communication",
    label: "gRPC",
    value: "grpc",
  },
];

const ULTRACITE_EDITOR_OPTIONS: WizardOption<UltraciteEditor>[] = [
  {
    description: "Universal (creates .vscode/settings.json)",
    label: "Universal",
    value: "universal",
  },
  {
    description: "Zed (creates .zed/settings.json)",
    label: "Zed",
    value: "zed",
  },
];

const ULTRACITE_AGENT_OPTIONS: WizardOption<UltraciteAgent>[] = [
  {
    description: "Universal (creates AGENTS.md)",
    label: ".agents (Universal)",
    value: "universal",
  },
  {
    description: "Claude (creates .claude/CLAUDE.md)",
    label: "Claude",
    value: "claude",
  },
  {
    description: "Replit (creates replit.md)",
    label: "Replit",
    value: "replit",
  },
  {
    description: "Aider (creates ultracite.md)",
    label: "Aider",
    value: "aider",
  },
  {
    description: "Gemini (creates GEMINI.md)",
    label: "Gemini",
    value: "gemini",
  },
  {
    description: "Roo (creates .roo/rules/ultracite.md)",
    label: "Roo",
    value: "roo-code",
  },
  {
    description: "Amazon Q CLI (creates .amazonq/rules/ultracite.md)",
    label: "Amazon Q CLI",
    value: "amazon-q-cli",
  },
  {
    description: "Firebender (creates firebender.json)",
    label: "Firebender",
    value: "firebender",
  },
];

const ULTRACITE_HOOK_OPTIONS: WizardOption<UltraciteHook>[] = [
  {
    description: "Cursor agent hooks",
    label: "Cursor",
    value: "cursor",
  },
  {
    description: "Windsurf agent hooks",
    label: "Windsurf",
    value: "windsurf",
  },
  {
    description: "CodeBuddy agent hooks",
    label: "CodeBuddy",
    value: "codebuddy",
  },
  {
    description: "Claude agent hooks",
    label: "Claude",
    value: "claude",
  },
];

const ULTRACITE_INSTALL_SKILL_OPTIONS: WizardOption<UltraciteInstallSkill>[] = [
  {
    description: "Install the reusable Ultracite skill after setup",
    label: "Yes",
    value: "yes",
  },
  {
    description: "Skip installing the Ultracite skill",
    label: "No",
    value: "no",
  },
];

const INIT_GIT_OPTIONS: WizardOption<InitGitOption>[] = [
  {
    description: "Run git init and create initial commit",
    label: "Yes",
    value: "yes",
  },
  {
    description: "Skip git initialization",
    label: "No",
    value: "no",
  },
];

const INSTALL_DEPENDENCY_OPTIONS: WizardOption<InstallDependencyOption>[] = [
  {
    description:
      "Install all project dependencies using the selected package manager",
    label: "Yes (Recommended)",
    value: "yes",
  },
  {
    description: "Skip dependency installation",
    label: "No",
    value: "no",
  },
];

const STEP_LABELS: Record<WizardStepId, string> = {
  addons: "Addons",
  apiLayer: "API layer",
  architecture: "Architecture",
  auth: "Authentication",
  database: "Database",
  done: "Done",
  extras: "Extras",
  formatter: "Formatter",
  httpProvider: "HTTP provider",
  initGit: "Git repository",
  installDependencies: "Install dependencies",
  installing: "Installing",
  microservices: "Microservices communication",
  orm: "ORM",
  packageManager: "Package manager",
  projectName: "Project name",
  projectType: "Project type",
  summary: "Summary",
  ultraciteAgents: "Ultracite agents",
  ultraciteEditors: "Ultracite editors",
  ultraciteHooks: "Ultracite hooks",
  ultraciteInstallSkill: "Ultracite skill",
};

const WIZARD_STEP_ORDER: WizardStepId[] = [
  "projectName",
  "packageManager",
  "formatter",
  "httpProvider",
  "projectType",
  "architecture",
  "database",
  "orm",
  "apiLayer",
  "auth",
  "extras",
  "microservices",
  "addons",
  "ultraciteEditors",
  "ultraciteAgents",
  "ultraciteHooks",
  "ultraciteInstallSkill",
  "initGit",
  "installDependencies",
  "summary",
  "installing",
  "done",
];

const ULTRACITE_SUB_STEPS: WizardStepId[] = [
  "ultraciteEditors",
  "ultraciteAgents",
  "ultraciteHooks",
  "ultraciteInstallSkill",
];

const SCAFFOLD_STAGES = [
  { id: "generate-files", label: "Generate project files" },
  { id: "install-agent-skills", label: "Install agent skills" },
  { id: "setup-linter", label: "Setup linter & config" },
  { id: "initialize-git", label: "Initialize Git" },
  { id: "initial-commit", label: "Initial commit" },
  { id: "install-dependencies", label: "Install dependencies" },
  { id: "run-formatter", label: "Run formatter" },
  { id: "formatter-commit", label: "Commit formatting" },
] as const;

const NESTJS_ASCII_CAT = `  ／l、
（ﾟ､ ｡７
 l、ﾞ ~ヽ
 じし(_,)ノ`;

// ==========================================
// Helper Utilities
// ==========================================

function resolveProjectName(name: string): string {
  const trimmed = name.trim();
  return trimmed || DEFAULT_PROJECT_NAME;
}

function validateProjectName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed.length > MAX_PROJECT_NAME_LENGTH) {
    return `Project name must be at most ${MAX_PROJECT_NAME_LENGTH} characters`;
  }
  if (!PROJECT_NAME_PATTERN.test(trimmed)) {
    return "Use lowercase letters, numbers, and hyphens; start with letter";
  }
  return null;
}

function getVisibleSteps(state: CreateProjectWizardState): WizardStepId[] {
  return WIZARD_STEP_ORDER.filter((step) => {
    if (step === "orm" && state.database.length === 0) {
      return false;
    }
    if (step === "auth" && state.api.length === 0) {
      return false;
    }
    if (step === "microservices" && state.architecture !== "nest-gateway") {
      return false;
    }
    if (
      (step === "ultraciteEditors" ||
        step === "ultraciteAgents" ||
        step === "ultraciteHooks" ||
        step === "ultraciteInstallSkill") &&
      (!state.addons.includes("ultracite") || state.formatter === "none")
    ) {
      return false;
    }
    return true;
  });
}

function isUltraciteSubStep(stepId: WizardStepId): boolean {
  return (ULTRACITE_SUB_STEPS as WizardStepId[]).includes(stepId);
}

function getUltraciteSubStepInfo(
  stepId: WizardStepId,
  state: CreateProjectWizardState
): { current: number; total: number; percent: number } | null {
  if (!isUltraciteSubStep(stepId)) {
    return null;
  }
  const visibleUltracite = ULTRACITE_SUB_STEPS.filter((s) =>
    getVisibleSteps(state).includes(s)
  );
  const index = visibleUltracite.indexOf(stepId);
  if (index === -1) {
    return null;
  }
  const total = visibleUltracite.length;
  const current = index + 1;
  const percent = Math.round((current / total) * 100);
  return { current, percent, total };
}

function getTotalSteps(state: CreateProjectWizardState): number {
  return getVisibleSteps(state).filter(
    (s) => s !== "installing" && s !== "done" && !isUltraciteSubStep(s)
  ).length;
}

function getDisplayStepNumber(
  stepId: WizardStepId,
  state: CreateProjectWizardState
): number {
  const visible = getVisibleSteps(state).filter(
    (s) => s !== "installing" && s !== "done"
  );
  if (stepId === "installing" || stepId === "done") {
    return getTotalSteps(state);
  }
  if (isUltraciteSubStep(stepId)) {
    const addonsIndex = visible.indexOf("addons");
    return addonsIndex === -1 ? 1 : addonsIndex + 1;
  }
  const filteredVisible = visible.filter((s) => !isUltraciteSubStep(s));
  const index = filteredVisible.indexOf(stepId);
  if (index === -1) {
    return 1;
  }
  return index + 1;
}

function getNextStepId(
  current: WizardStepId,
  state: CreateProjectWizardState
): WizardStepId | null {
  const visible = getVisibleSteps(state);
  const index = visible.indexOf(current);
  if (index === -1 || index >= visible.length - 1) {
    return null;
  }
  return visible[index + 1] ?? null;
}

function getPreviousStepId(
  current: WizardStepId,
  state: CreateProjectWizardState
): WizardStepId | null {
  const visible = getVisibleSteps(state);
  const index = visible.indexOf(current);
  if (index <= 0) {
    return null;
  }
  return visible[index - 1] ?? null;
}

const INITIAL_STATE: CreateProjectWizardState = {
  addons: [],
  api: [],
  architecture: null,
  auth: null,
  database: [],
  extras: [],
  formatter: null,
  httpProvider: null,
  initGit: null,
  installDependencies: null,
  microservices: [],
  orm: [],
  packageManager: null,
  projectName: "",
  projectType: null,
  ultraciteAgents: [],
  ultraciteEditors: [],
  ultraciteHooks: [],
  ultraciteInstallSkill: null,
};

interface InteractiveTerminalWizardProps {
  onClose?: () => void;
}

export const InteractiveTerminalWizard = ({
  onClose,
}: InteractiveTerminalWizardProps) => {
  const [state, setState] =
    React.useState<CreateProjectWizardState>(INITIAL_STATE);
  const [stepId, setStepId] = React.useState<WizardStepId>("projectName");
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const [projectNameInput, setProjectNameInput] = React.useState("");
  const [projectNameError, setProjectNameError] = React.useState<string | null>(
    null
  );

  // Simulated installation stage & progress
  const [installStageIndex, setInstallStageIndex] = React.useState(0);
  const [installProgressPct, setInstallProgressPct] = React.useState(0);

  const terminalRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Context breadcrumbs
  const visibleSteps = React.useMemo(() => getVisibleSteps(state), [state]);
  const totalSteps = React.useMemo(() => getTotalSteps(state), [state]);
  const displayStep = React.useMemo(
    () => getDisplayStepNumber(stepId, state),
    [stepId, state]
  );
  const subProgress = React.useMemo(
    () => getUltraciteSubStepInfo(stepId, state),
    [stepId, state]
  );

  // Step Options getter based on current step
  const currentStepConfig = React.useMemo(() => {
    switch (stepId) {
      case "packageManager":
        return {
          isMulti: false,
          options: PACKAGE_MANAGER_OPTIONS,
          prompt: "Choose a package manager",
        };
      case "formatter":
        return {
          isMulti: false,
          options: FORMATTER_OPTIONS,
          prompt: "Choose a formatter-linter (with ultracite preset) setup",
        };
      case "httpProvider":
        return {
          isMulti: false,
          options: HTTP_PROVIDER_OPTIONS,
          prompt: "Choose an HTTP provider",
        };
      case "projectType":
        return {
          isMulti: false,
          options: PROJECT_TYPE_OPTIONS,
          prompt: "Choose a project layout",
        };
      case "architecture": {
        const opts =
          state.projectType === "monorepo"
            ? ARCHITECTURE_OPTIONS
            : ARCHITECTURE_OPTIONS.filter((o) => o.value !== "nest-gateway");
        return {
          isMulti: false,
          options: opts,
          prompt: "Choose an application architecture",
        };
      }
      case "database": {
        const noDb: WizardOption<string> = {
          description: "Skip database scaffolding for now",
          label: "No database",
          value: "none",
        };
        const dbOpts = state.orm.includes("drizzle")
          ? DATABASE_OPTIONS.filter((o) => o.value !== "mongodb")
          : DATABASE_OPTIONS;
        return {
          isMulti: false,
          options: [noDb, ...dbOpts],
          prompt: "Select a database for your project (optional)",
        };
      }
      case "orm": {
        const noOrm: WizardOption<string> = {
          description: "Use plain database access without an ORM",
          label: "No ORM",
          value: "none",
        };
        const ormOpts = state.database.includes("mongodb")
          ? ORM_OPTIONS.filter((o) => o.value !== "drizzle")
          : ORM_OPTIONS;
        return {
          isMulti: false,
          options: [noOrm, ...ormOpts],
          prompt: "Select an ORM to include",
        };
      }
      case "apiLayer": {
        const apiOpts =
          state.database.length === 0
            ? API_OPTIONS.filter((o) => o.value !== "graphql")
            : API_OPTIONS;
        return {
          isMulti: true,
          options: apiOpts,
          prompt: "Select API layers (optional)",
        };
      }
      case "auth": {
        const authOpts =
          state.database.length === 0
            ? AUTH_OPTIONS.filter((o) => o.value !== "better-auth")
            : AUTH_OPTIONS;
        return {
          isMulti: false,
          options: authOpts,
          prompt: "Choose an authentication strategy",
        };
      }
      case "extras":
        return {
          isMulti: true,
          options: EXTRA_OPTIONS,
          prompt: "Select extras (optional)",
        };
      case "microservices":
        return {
          isMulti: true,
          options: MICROSERVICE_OPTIONS,
          prompt: "Select microservice communication protocols",
        };
      case "addons": {
        const visibleAddons = ADDON_OPTIONS.filter((opt) => {
          if (opt.value === "ultracite" && state.formatter === "none")
            return false;
          if (opt.value === "scalar-ui" && !state.extras.includes("swagger"))
            return false;
          return true;
        });
        return {
          isMulti: true,
          options: visibleAddons,
          prompt: "Select addons (optional)",
        };
      }
      case "ultraciteEditors":
        return {
          isMulti: true,
          options: ULTRACITE_EDITOR_OPTIONS,
          prompt: "Select Ultracite editors",
        };
      case "ultraciteAgents":
        return {
          isMulti: true,
          options: ULTRACITE_AGENT_OPTIONS,
          prompt: "Select Ultracite agents",
        };
      case "ultraciteHooks":
        return {
          isMulti: true,
          options: ULTRACITE_HOOK_OPTIONS,
          prompt: "Select Ultracite hooks",
        };
      case "ultraciteInstallSkill":
        return {
          isMulti: false,
          options: ULTRACITE_INSTALL_SKILL_OPTIONS,
          prompt: "Install Ultracite skill?",
        };
      case "initGit":
        return {
          isMulti: false,
          options: INIT_GIT_OPTIONS,
          prompt: "Initialize a git repository?",
        };
      case "installDependencies":
        return {
          isMulti: false,
          options: INSTALL_DEPENDENCY_OPTIONS,
          prompt: "Install dependencies?",
        };
      default:
        return null;
    }
  }, [stepId, state]);

  // Reset focus index on step change
  React.useEffect(() => {
    setFocusedIndex(0);
    if (stepId === "projectName") {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [stepId]);

  // Navigation handlers
  const goToNextStep = React.useCallback(() => {
    const next = getNextStepId(stepId, state);
    if (next) {
      setStepId(next);
    }
  }, [stepId, state]);

  const goToPreviousStep = React.useCallback(() => {
    const prev = getPreviousStepId(stepId, state);
    if (prev) {
      setStepId(prev);
    }
  }, [stepId, state]);

  const handleRestart = React.useCallback(() => {
    setState(INITIAL_STATE);
    setProjectNameInput("");
    setProjectNameError(null);
    setInstallStageIndex(0);
    setInstallProgressPct(0);
    setStepId("projectName");
  }, []);

  // Submit project name
  const handleProjectNameSubmit = React.useCallback(() => {
    const err = validateProjectName(projectNameInput);
    if (err) {
      setProjectNameError(err);
      return;
    }
    const resolved = resolveProjectName(projectNameInput);
    setState((s) => ({ ...s, projectName: resolved }));
    goToNextStep();
  }, [projectNameInput, goToNextStep]);

  // Single select choice confirm
  const handleSingleSelectConfirm = React.useCallback(
    (value: string) => {
      setState((prev) => {
        const next = { ...prev };
        switch (stepId) {
          case "packageManager":
            next.packageManager = value as PackageManager;
            break;
          case "formatter":
            next.formatter = value as FormatterOption;
            if (value === "none") {
              next.addons = next.addons.filter((a) => a !== "ultracite");
            }
            break;
          case "httpProvider":
            next.httpProvider = value as HttpProvider;
            break;
          case "projectType":
            next.projectType = value as ProjectType;
            if (value === "single" && next.architecture === "nest-gateway") {
              next.architecture = "nest-api";
            }
            break;
          case "architecture":
            next.architecture = value as Architecture;
            break;
          case "database":
            next.database = value === "none" ? [] : [value as Database];
            if (value === "none") {
              next.orm = [];
            }
            break;
          case "orm":
            next.orm = value === "none" ? [] : [value as Orm];
            break;
          case "auth":
            next.auth = value as AuthOption;
            break;
          case "ultraciteInstallSkill":
            next.ultraciteInstallSkill = value as UltraciteInstallSkill;
            break;
          case "initGit":
            next.initGit = value as InitGitOption;
            break;
          case "installDependencies":
            next.installDependencies = value as InstallDependencyOption;
            break;
          default:
            break;
        }
        return next;
      });
      goToNextStep();
    },
    [stepId, goToNextStep]
  );

  // Multi select toggle
  const handleMultiSelectToggle = React.useCallback(
    (value: string) => {
      setState((prev) => {
        const next = { ...prev };
        switch (stepId) {
          case "apiLayer": {
            const cur = next.api;
            next.api = cur.includes(value as ApiOption)
              ? cur.filter((v) => v !== value)
              : [...cur, value as ApiOption];
            break;
          }
          case "extras": {
            const cur = next.extras;
            next.extras = cur.includes(value as ExtraOption)
              ? cur.filter((v) => v !== value)
              : [...cur, value as ExtraOption];
            break;
          }
          case "microservices": {
            const cur = next.microservices;
            next.microservices = cur.includes(value as MicroserviceOption)
              ? cur.filter((v) => v !== value)
              : [...cur, value as MicroserviceOption];
            break;
          }
          case "addons": {
            const cur = next.addons;
            next.addons = cur.includes(value as AddonOption)
              ? cur.filter((v) => v !== value)
              : [...cur, value as AddonOption];
            break;
          }
          case "ultraciteEditors": {
            const cur = next.ultraciteEditors;
            next.ultraciteEditors = cur.includes(value as UltraciteEditor)
              ? cur.filter((v) => v !== value)
              : [...cur, value as UltraciteEditor];
            break;
          }
          case "ultraciteAgents": {
            const cur = next.ultraciteAgents;
            next.ultraciteAgents = cur.includes(value as UltraciteAgent)
              ? cur.filter((v) => v !== value)
              : [...cur, value as UltraciteAgent];
            break;
          }
          case "ultraciteHooks": {
            const cur = next.ultraciteHooks;
            next.ultraciteHooks = cur.includes(value as UltraciteHook)
              ? cur.filter((v) => v !== value)
              : [...cur, value as UltraciteHook];
            break;
          }
          default:
            break;
        }
        return next;
      });
    },
    [stepId]
  );

  // Simulated installation stage runner
  React.useEffect(() => {
    if (stepId !== "installing") return;

    setInstallStageIndex(0);
    setInstallProgressPct(0);

    const stagesCount = SCAFFOLD_STAGES.length;
    let currentStage = 0;

    const stageTimer = setInterval(() => {
      currentStage += 1;
      setInstallStageIndex(currentStage);

      if (currentStage >= stagesCount) {
        clearInterval(stageTimer);
        setTimeout(() => {
          setStepId("done");
        }, 500);
      }
    }, 450);

    const progressTimer = setInterval(() => {
      setInstallProgressPct((p) => {
        if (p >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.min(100, p + 12);
      });
    }, 120);

    return () => {
      clearInterval(stageTimer);
      clearInterval(progressTimer);
    };
  }, [stepId]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in text input unless Enter
      if (stepId === "projectName") {
        if (e.key === "Enter") {
          e.preventDefault();
          handleProjectNameSubmit();
        }
        return;
      }

      if (e.key === "Escape" && onClose) {
        e.preventDefault();
        onClose();
        return;
      }

      if (
        (e.ctrlKey && e.key.toLowerCase() === "b") ||
        (e.key === "Backspace" && stepId !== "installing" && stepId !== "done")
      ) {
        e.preventDefault();
        goToPreviousStep();
        return;
      }

      if (stepId === "done") {
        if (e.key === "Enter" || e.key.toLowerCase() === "r") {
          e.preventDefault();
          handleRestart();
        }
        return;
      }

      if (stepId === "summary") {
        if (e.key === "Enter") {
          e.preventDefault();
          setStepId("installing");
        }
        return;
      }

      if (stepId === "installing") {
        return;
      }

      if (!currentStepConfig) return;

      const optsLength = currentStepConfig.options.length;

      if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + optsLength) % optsLength);
      } else if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % optsLength);
      } else if (e.key === " " && currentStepConfig.isMulti) {
        e.preventDefault();
        const opt = currentStepConfig.options[focusedIndex];
        if (opt) handleMultiSelectToggle(opt.value);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentStepConfig.isMulti) {
          goToNextStep();
        } else {
          const opt = currentStepConfig.options[focusedIndex];
          if (opt) handleSingleSelectConfirm(opt.value);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    stepId,
    currentStepConfig,
    focusedIndex,
    handleProjectNameSubmit,
    handleSingleSelectConfirm,
    handleMultiSelectToggle,
    goToNextStep,
    goToPreviousStep,
    handleRestart,
  ]);

  // Context breadcrumbs text (only previously confirmed choices)
  const contextBreadcrumbs = React.useMemo(() => {
    const parts: string[] = [];
    if (state.packageManager) parts.push(state.packageManager);
    if (state.formatter) {
      const fLabels: Record<string, string> = {
        biome: "Biome",
        none: "No formatter",
        "oxlint-oxfmt": "Oxlint+Oxfmt",
      };
      parts.push(fLabels[state.formatter] ?? state.formatter);
    }
    if (state.httpProvider) parts.push(state.httpProvider);
    if (state.projectType)
      parts.push(state.projectType === "monorepo" ? "Monorepo" : "Single");
    if (state.architecture) {
      const archLabels: Record<string, string> = {
        "nest-api": "Nest API",
        "nest-gateway": "API Gateway",
        "nest-microservice": "Microservice",
      };
      parts.push(archLabels[state.architecture] ?? state.architecture);
    }
    if (state.database.length > 0) parts.push(state.database.join(", "));
    if (state.orm.length > 0) parts.push(state.orm.join(", "));
    if (state.api.length > 0) parts.push(state.api.join(", "));
    if (state.auth && state.auth !== "none") parts.push(state.auth);
    if (state.microservices.length > 0)
      parts.push(state.microservices.join(", "));
    if (state.extras.length > 0) parts.push(`+${state.extras.length} extras`);
    if (state.addons.length > 0 && !isUltraciteSubStep(stepId))
      parts.push(`+${state.addons.length} addons`);
    if (state.initGit)
      parts.push(state.initGit === "yes" ? "git init" : "no git");
    if (state.installDependencies) {
      parts.push(
        state.installDependencies === "yes" ? "install: yes" : "install: no"
      );
    }
    return parts;
  }, [state, stepId]);

  // Render Multi / Single Select item
  const renderOptionItem = (
    option: WizardOption,
    index: number,
    isMulti: boolean,
    isSelected: boolean,
    isFocused: boolean
  ) => {
    const checkGlyph = isSelected ? "●" : "○";

    return (
      <div
        key={option.value}
        onClick={() => {
          setFocusedIndex(index);
          if (isMulti) {
            handleMultiSelectToggle(option.value);
          } else {
            handleSingleSelectConfirm(option.value);
          }
        }}
        onMouseEnter={() => setFocusedIndex(index)}
        className={`group flex cursor-pointer flex-col rounded-md px-3 py-2 transition-all select-none ${
          isFocused
            ? "border border-red-500/30 bg-red-500/10 text-zinc-100 shadow-[0_0_15px_rgba(239,68,68,0.08)]"
            : "border border-transparent text-zinc-400 hover:border-white/5 hover:bg-white/[0.02]"
        }`}
      >
        <div className="flex items-center gap-2.5">
          {/* Arrow cursor */}
          <span
            className={`w-3.5 font-mono font-bold ${
              isFocused ? "text-red-400" : "text-transparent"
            }`}
          >
            &gt;
          </span>

          {/* Checkbox indicator for multi select */}
          {isMulti && (
            <span
              className={`font-mono text-sm ${
                isSelected ? "font-bold text-red-400" : "text-zinc-500"
              }`}
            >
              {checkGlyph}
            </span>
          )}

          {/* Label */}
          <span
            className={`font-mono text-xs sm:text-sm ${
              isFocused
                ? "font-semibold text-red-400"
                : isSelected
                  ? "text-zinc-100"
                  : "text-zinc-400"
            }`}
          >
            {option.label}
          </span>
        </div>

        {/* Description when focused */}
        {isFocused && option.description && (
          <p className="mt-1 ml-6 font-mono text-[11px] leading-relaxed text-zinc-400 sm:text-xs">
            {option.description}
          </p>
        )}
      </div>
    );
  };

  const isMultiSelected = (val: string): boolean => {
    switch (stepId) {
      case "apiLayer":
        return state.api.includes(val as ApiOption);
      case "extras":
        return state.extras.includes(val as ExtraOption);
      case "microservices":
        return state.microservices.includes(val as MicroserviceOption);
      case "addons":
        return state.addons.includes(val as AddonOption);
      case "ultraciteEditors":
        return state.ultraciteEditors.includes(val as UltraciteEditor);
      case "ultraciteAgents":
        return state.ultraciteAgents.includes(val as UltraciteAgent);
      case "ultraciteHooks":
        return state.ultraciteHooks.includes(val as UltraciteHook);
      default:
        return false;
    }
  };

  const isSingleSelected = (val: string): boolean => {
    switch (stepId) {
      case "packageManager":
        return state.packageManager === val;
      case "formatter":
        return state.formatter === val;
      case "httpProvider":
        return state.httpProvider === val;
      case "projectType":
        return state.projectType === val;
      case "architecture":
        return state.architecture === val;
      case "database":
        return val === "none"
          ? state.database.length === 0
          : state.database.includes(val as Database);
      case "orm":
        return val === "none"
          ? state.orm.length === 0
          : state.orm.includes(val as Orm);
      case "auth":
        return state.auth === val;
      case "ultraciteInstallSkill":
        return state.ultraciteInstallSkill === val;
      case "initGit":
        return state.initGit === val;
      case "installDependencies":
        return state.installDependencies === val;
      default:
        return false;
    }
  };

  return (
    <div
      ref={terminalRef}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-red-500/25 bg-[#0a0a0f]/95 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all"
    >
      {/* Terminal Title Bar */}
      <div className="relative flex shrink-0 items-center justify-between border-b border-white/10 bg-[#12131c] px-4 py-1.5">
        <div className="flex items-center gap-2">
          <span className="inline-block size-3 rounded-full border border-black/20 bg-[#ff5f56]" />
          <span className="inline-block size-3 rounded-full border border-black/20 bg-[#ffbd2e]" />
          <span className="inline-block size-3 rounded-full border border-black/20 bg-[#27c93f]" />
        </div>

        {/* Center Title */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-xs text-zinc-400">
          <span className="contents sm:flex">nest-arch</span>
        </div>

        {/* Right Corner Badge and Actions */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-red-400">
            <span className="size-1.5 animate-pulse rounded-full bg-red-400" />
            LIVE DEMO
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-auto cursor-pointer items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
              title="Close demo mode (Esc)"
            >
              <Minimize2 className="size-3.5 text-zinc-400" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Inner Body */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4 font-mono text-xs leading-relaxed text-zinc-300 sm:p-5 sm:text-sm">
        {/* Context Bar & Header (Hidden during install / done) */}
        {stepId !== "installing" && stepId !== "done" && (
          <div className="mb-3 shrink-0 space-y-1.5 border-b border-white/10 pb-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-semibold text-red-400">
                <span>◆</span>
                <span>Create a new NestJS project</span>
              </div>
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300"
                title="Restart wizard"
              >
                <RotateCcw className="size-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* Context Box (Shown from Step 2 onwards once project name is submitted) */}
            {stepId !== "projectName" &&
              stepId !== "summary" &&
              state.projectName.trim() !== "" && (
                <div className="rounded border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-zinc-400 sm:text-xs">
                  <span>Project Name: </span>
                  <span className="font-semibold text-red-400">
                    {resolveProjectName(state.projectName)}
                  </span>
                  {contextBreadcrumbs.length > 0 && (
                    <>
                      <span className="text-zinc-500"> Selected: </span>
                      <span className="text-zinc-300">
                        {contextBreadcrumbs.join(" · ")}
                      </span>
                    </>
                  )}
                </div>
              )}

            {/* Step Title */}
            <div className="pt-0.5 text-xs sm:text-sm">
              <span className="font-medium text-zinc-200">Create project</span>
              <span className="text-zinc-400">{` — step ${displayStep}/${totalSteps}`}</span>
              {subProgress ? (
                <span className="text-[#61AFEF]">
                  {` · Ultracite config (${subProgress.current}/${subProgress.total} · ${subProgress.percent}%)`}
                </span>
              ) : (
                <span className="text-[#61AFEF]">
                  {` · ${STEP_LABELS[stepId]}`}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Step Contents Container */}
        <div className="flex min-h-0 flex-1 flex-col justify-start overflow-y-auto pr-1">
          {/* STEP 1: PROJECT NAME */}
          {stepId === "projectName" && (
            <div className="space-y-4">
              <p className="text-sm text-zinc-300 sm:text-base">
                What is your project name?
              </p>
              <div className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/[0.03] px-3.5 py-2.5 text-zinc-100 focus-within:border-red-400">
                <span className="font-mono font-bold text-red-400">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={projectNameInput}
                  onChange={(e) => {
                    setProjectNameInput(e.target.value);
                    setProjectNameError(validateProjectName(e.target.value));
                  }}
                  placeholder="my-nest-app"
                  className="w-full bg-transparent font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none sm:text-base"
                />
              </div>
              {projectNameError ? (
                <p className="text-xs text-red-400">{projectNameError}</p>
              ) : (
                <p className="text-xs text-zinc-500">
                  Press Enter to confirm, or click continue below.
                </p>
              )}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleProjectNameSubmit}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/15 px-4 py-2 font-mono text-xs font-semibold text-red-300 transition-all hover:bg-red-500/25 sm:text-sm"
                >
                  Continue <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          )}

          {/* SINGLE / MULTI SELECT STEPS */}
          {currentStepConfig && (
            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <div className="flex shrink-0 items-center justify-between">
                <p className="text-sm font-medium text-zinc-300 sm:text-base">
                  {currentStepConfig.prompt}
                </p>
                {currentStepConfig.isMulti && (
                  <span className="rounded bg-[#E8C468]/10 px-2 py-0.5 text-[11px] font-medium text-[#E8C468]">
                    Space to toggle · Enter to confirm
                  </span>
                )}
              </div>

              <div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
                {currentStepConfig.options.map((opt, idx) => {
                  const isSelected = currentStepConfig.isMulti
                    ? isMultiSelected(opt.value)
                    : isSingleSelected(opt.value);
                  const isFocused = idx === focusedIndex;
                  return renderOptionItem(
                    opt,
                    idx,
                    currentStepConfig.isMulti,
                    isSelected,
                    isFocused
                  );
                })}
              </div>

              {currentStepConfig.isMulti && (
                <div className="shrink-0 pt-2">
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/15 px-4 py-2 font-mono text-xs font-semibold text-red-300 transition-all hover:bg-red-500/25 sm:text-sm"
                  >
                    Confirm selection (
                    {
                      currentStepConfig.options.filter((o) =>
                        isMultiSelected(o.value)
                      ).length
                    }{" "}
                    chosen) <ChevronRight className="size-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SUMMARY STEP */}
          {stepId === "summary" && (
            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-red-400">✦</span>
                <span className="font-semibold text-[#61AFEF]">
                  Review your selections
                </span>
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-1 gap-1.5 overflow-y-auto rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs sm:grid-cols-2">
                <div>
                  <span className="text-[#e96142ff]">Project: </span>
                  <span className="font-semibold text-[#E8C468]">
                    {resolveProjectName(state.projectName)}
                  </span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">Package manager: </span>
                  <span className="text-[#E8C468]">
                    {state.packageManager ?? "—"}
                  </span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">Formatter: </span>
                  <span className="text-[#E8C468]">
                    {state.formatter ?? "—"}
                  </span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">HTTP provider: </span>
                  <span className="text-[#E8C468]">
                    {state.httpProvider ?? "—"}
                  </span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">Project type: </span>
                  <span className="text-[#E8C468]">
                    {state.projectType ?? "—"}
                  </span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">Architecture: </span>
                  <span className="text-[#E8C468]">
                    {state.architecture ?? "—"}
                  </span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">Database: </span>
                  <span className="text-[#E8C468]">
                    {state.database.length > 0
                      ? state.database.join(", ")
                      : "None"}
                  </span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">ORM: </span>
                  <span className="text-[#E8C468]">
                    {state.orm.length > 0 ? state.orm.join(", ") : "None"}
                  </span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">API layer: </span>
                  <span className="text-[#E8C468]">
                    {state.api.length > 0 ? state.api.join(", ") : "None"}
                  </span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">Auth: </span>
                  <span className="text-[#E8C468]">{state.auth ?? "None"}</span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">Extras: </span>
                  <span className="text-[#E8C468]">
                    {state.extras.length > 0 ? state.extras.join(", ") : "None"}
                  </span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">Addons: </span>
                  <span className="text-[#E8C468]">
                    {state.addons.length > 0 ? state.addons.join(", ") : "None"}
                  </span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">Git: </span>
                  <span className="text-[#E8C468]">
                    {state.initGit === "yes" ? "Initialize repository" : "Skip"}
                  </span>
                </div>
                <div>
                  <span className="text-[#e96142ff]">Install deps: </span>
                  <span className="text-[#E8C468]">
                    {state.installDependencies === "yes" ? "Install" : "Skip"}
                  </span>
                </div>
              </div>

              <div className="shrink-0 pt-1">
                <button
                  type="button"
                  onClick={() => setStepId("installing")}
                  className="inline-flex items-center gap-2 rounded-md border border-red-400 bg-red-500/20 px-4 py-2 font-mono text-xs font-bold text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.25)] transition-all hover:scale-[1.02] hover:bg-red-500/35"
                >
                  <Sparkles className="size-4 text-red-400" />
                  Scaffold Project Demo (Enter)
                </button>
              </div>
            </div>
          )}

          {/* INSTALLING STEP (Simulated scaffolding) */}
          {stepId === "installing" && (
            <div className="flex min-h-0 flex-1 flex-col gap-3">
              {/* ASCII Bouncing Cat */}
              <div className="flex shrink-0 items-start gap-4">
                <pre className="font-mono text-xs leading-none text-red-400">
                  {NESTJS_ASCII_CAT}
                </pre>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                    <span className="animate-spin text-red-400">⠋</span>
                    <span>Scaffolding your project...</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Generating templates and configuring developer environment
                  </p>
                </div>
              </div>

              {/* Sequential Stages Progress */}
              <div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs">
                {SCAFFOLD_STAGES.map((stage, idx) => {
                  const isDone = idx < installStageIndex;
                  const isCurrent = idx === installStageIndex;

                  return (
                    <div
                      key={stage.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <span className="font-bold text-[#7FD99A]">✓</span>
                        ) : isCurrent ? (
                          <span className="animate-pulse font-bold text-[#E8C468]">
                            ⠋
                          </span>
                        ) : (
                          <span className="text-zinc-600">○</span>
                        )}
                        <span
                          className={
                            isDone
                              ? "text-zinc-300"
                              : isCurrent
                                ? "font-semibold text-[#E8C468]"
                                : "text-zinc-600"
                          }
                        >
                          {stage.label}
                        </span>
                      </div>

                      {isCurrent && stage.id === "install-dependencies" && (
                        <div className="flex items-center gap-2 text-[11px] text-[#E8C468]">
                          <span>({installProgressPct}%)</span>
                          <span className="font-mono">
                            {"█".repeat(
                              Math.round((installProgressPct / 100) * 8)
                            )}
                            {"░".repeat(
                              8 - Math.round((installProgressPct / 100) * 8)
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DONE STEP */}
          {stepId === "done" && (
            <div className="flex min-h-0 flex-1 flex-col gap-2.5">
              <div className="flex shrink-0 items-center gap-2 text-sm font-bold text-[#7FD99A]">
                <Check className="size-4" />
                <span>Project scaffold completed successfully!</span>
              </div>

              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
                <div className="space-y-1 text-xs text-zinc-300">
                  <p>
                    Project:{" "}
                    <span className="font-bold text-[#61AFEF]">
                      {resolveProjectName(state.projectName)}
                    </span>
                  </p>
                  <p>
                    Architecture:{" "}
                    <span className="font-bold text-[#61AFEF]">
                      {state.architecture}
                    </span>
                  </p>
                  <p>
                    Package Manager:{" "}
                    <span className="font-bold text-[#61AFEF]">
                      {state.packageManager}
                    </span>
                  </p>
                </div>

                {/* Next steps card */}
                <div className="rounded-lg border border-red-500/40 bg-red-500/[0.05] p-3 text-xs">
                  <p className="font-bold text-zinc-100">🚀 NEXT STEPS</p>
                  <div className="mt-2 space-y-1.5 text-zinc-300">
                    <p>1. Move into the project directory:</p>
                    <p className="pl-3 font-bold text-[#61AFEF]">
                      cd {resolveProjectName(state.projectName)}
                    </p>
                    <p>2. Start development server:</p>
                    <p className="pl-3 font-bold text-[#61AFEF]">
                      {state.packageManager || "pnpm"} run dev
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 rounded-md border border-red-400/50 bg-red-500/20 px-3 py-1.5 font-mono text-xs font-semibold text-red-200 transition-all hover:bg-red-500/30"
                >
                  <RotateCcw className="size-3.5" /> Restart Demo (Enter)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Terminal Footer Status Bar */}
        {stepId !== "installing" && stepId !== "done" && (
          <div className="mt-auto flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2.5 text-[11px] text-zinc-500">
            <div className="flex items-center gap-2">
              <span>
                Use <span className="font-semibold text-zinc-300">↑/↓</span>,{" "}
                <span className="font-semibold text-zinc-300">Mouse Click</span>{" "}
                or <span className="font-semibold text-zinc-300">Tab</span> to
                select •{" "}
                <span className="font-semibold text-zinc-300">Enter</span> to
                confirm
              </span>
            </div>

            {visibleSteps.indexOf(stepId) > 0 && (
              <button
                type="button"
                onClick={goToPreviousStep}
                className="inline-flex items-center gap-1 text-zinc-400 transition-colors hover:text-zinc-200"
              >
                <ArrowLeft className="size-3" />
                <span>Back (Ctrl+B)</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
