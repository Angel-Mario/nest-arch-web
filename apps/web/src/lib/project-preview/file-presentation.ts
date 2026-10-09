const nestFile =
  /\.(?:controller|service|module|guard|interceptor|decorator|filter|middleware|pipe|gateway|resolver|entity)\.ts$/u;
const testFile = /\.(?:spec|test|e2e-spec)\.[cm]?[jt]s$/u;

const namedIcons: Record<string, string> = {
  ".dockerignore": "docker",
  ".env": "tune",
  ".env.example": "tune",
  ".gitignore": "git",
  ".oxfmtrc.json": "oxc",
  ".oxfmtrc.jsonc": "oxc",
  Dockerfile: "docker",
  "nest-arch.jsonc": "nest",
  "nest-cli.json": "nest",
  "oxlint.config.ts": "oxc",
  "package.json": "nodejs",
  "pnpm-lock.yaml": "pnpm",
  "pnpm-workspace.yaml": "pnpm",
  "tsconfig.build.json": "tsconfig",
  "tsconfig.json": "tsconfig",
};

const extensionIcons: Record<string, string> = {
  cjs: "javascript",
  cts: "typescript",
  js: "javascript",
  json: "json",
  jsonc: "json",
  md: "markdown",
  mjs: "javascript",
  mts: "typescript",
  prisma: "prisma",
  proto: "proto",
  sql: "database",
  toml: "toml",
  ts: "typescript",
  yaml: "yaml",
  yml: "yaml",
};

const folderIcons: Record<string, string> = {
  api: "folder-api",
  config: "folder-config",
  database: "folder-database",
  prisma: "folder-prisma",
  proto: "folder-proto",
  src: "folder-src",
  test: "folder-test",
  tests: "folder-test",
};

export const fileIcon = (path: string): string => {
  const name = path.split("/").at(-1) ?? path;
  if (namedIcons[name]) {
    return namedIcons[name];
  }
  if (testFile.test(name)) {
    return "test-ts";
  }
  if (nestFile.test(name)) {
    const kind = name.split(".").at(-2);
    return kind === "dto" || kind === "entity" ? "nest" : `nest-${kind}`;
  }
  if (name.startsWith("vitest.config")) {
    return "vitest";
  }
  if (name.startsWith("docker-compose")) {
    return "docker";
  }
  return extensionIcons[name.split(".").at(-1) ?? ""] ?? "document";
};

export const folderIcon = (name: string): string =>
  folderIcons[name] ?? "folder-base";

const extensionLanguages: Record<string, string> = {
  cjs: "typescript",
  cts: "typescript",
  js: "typescript",
  json: "jsonc",
  jsonc: "jsonc",
  md: "markdown",
  mjs: "typescript",
  mts: "typescript",
  prisma: "prisma",
  sh: "shellscript",
  toml: "toml",
  ts: "typescript",
  yaml: "yaml",
  yml: "yaml",
};

export const fileLanguage = (path: string): string => {
  const name = path.split("/").at(-1) ?? path;
  if (name === "Dockerfile") {
    return "dockerfile";
  }
  if (name === ".env" || name.startsWith(".env.")) {
    return "dotenv";
  }
  return extensionLanguages[name.split(".").at(-1) ?? ""] ?? "text";
};
