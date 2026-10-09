import { z } from "zod";

const selection = <T extends string>(values: readonly [T, ...T[]]) =>
  z
    .array(z.enum(values))
    .max(values.length)
    .transform((items) => [...new Set(items)].toSorted());

// Only inputs that affect generated files belong in the shared cache key.
export const previewConfigSchema = z
  .object({
    addons: selection([
      "agent-skills",
      "husky",
      "ultracite",
      "nestjs-zod",
      "scalar-ui",
    ]).default([]),
    api: selection(["rest", "trpc", "graphql"]).default(["rest"]),
    architecture: z.enum(["nest-api", "nest-microservice"]).default("nest-api"),
    auth: z
      .enum(["none", "passport", "better-auth", "better-auth:stateless"])
      .default("none"),
    database: selection([
      "postgresql",
      "mysql",
      "sqlite",
      "mongodb",
      "sqlserver",
    ])
      .pipe(
        z
          .array(
            z.enum(["postgresql", "mysql", "sqlite", "mongodb", "sqlserver"])
          )
          .max(1)
      )
      .default([]),
    extras: selection([
      "docker",
      "health-check",
      "rate-limiting",
      "swagger",
      "todo-example",
      "typescript-7",
    ]).default([]),
    formatter: z
      .enum(["none", "biome", "oxlint-oxfmt", "eslint-prettier-no-stylelint"])
      .default("none"),
    httpProvider: z.enum(["express", "fastify"]).default("express"),
    microservices: selection([
      "redis",
      "mqtt",
      "nats",
      "rabbitmq",
      "kafka",
      "grpc",
    ]).default([]),
    orm: selection(["prisma", "typeorm", "drizzle"])
      .pipe(z.array(z.enum(["prisma", "typeorm", "drizzle"])).max(1))
      .default([]),
    packageManager: z.enum(["pnpm", "npm", "yarn", "bun"]).default("pnpm"),
    prismaVersion: z.literal("7").optional(),
    projectType: z.literal("single").default("single"),
    ultraciteAgents: z
      .array(
        z
          .string()
          .regex(/^[a-z][a-z0-9-]*$/u)
          .max(40)
      )
      .max(45)
      .default([]),
    ultraciteEditors: z
      .array(
        z
          .string()
          .regex(/^[a-z][a-z0-9-]*$/u)
          .max(40)
      )
      .max(12)
      .default([]),
    ultraciteHooks: selection([
      "cursor",
      "windsurf",
      "codebuddy",
      "claude",
      "copilot",
    ]).default([]),
    ultraciteInstallSkill: z.enum(["yes", "no"]).default("no"),
  })
  .strict();

export type PreviewConfig = z.output<typeof previewConfigSchema>;

export const normalizePreviewConfig = (input: unknown): PreviewConfig => {
  const parsed = previewConfigSchema.parse(input);
  const hasUltracite = parsed.addons.includes("ultracite");
  return {
    ...parsed,
    prismaVersion: parsed.orm.includes("prisma") ? "7" : undefined,
    ultraciteAgents: hasUltracite
      ? [...new Set(parsed.ultraciteAgents)].toSorted()
      : [],
    ultraciteEditors: hasUltracite
      ? [...new Set(parsed.ultraciteEditors)].toSorted()
      : [],
    ultraciteHooks: hasUltracite ? parsed.ultraciteHooks : [],
    ultraciteInstallSkill: hasUltracite ? parsed.ultraciteInstallSkill : "no",
  };
};

export const canonicalConfig = (config: PreviewConfig): string =>
  JSON.stringify(normalizePreviewConfig(config));

export interface PreviewFile {
  path: string;
  content: string;
}

export interface ProjectPreview {
  version: string;
  key: string;
  files: PreviewFile[];
}

export const PREVIEW_PROJECT_NAME = "nest-arch-preview-marker";

export const personalizePreview = (
  content: string,
  projectName: string
): string => {
  const name = /^[a-z][a-z0-9-]{0,63}$/u.test(projectName)
    ? projectName
    : "my-nest-app";
  const camel = name.replaceAll(/-[a-z0-9]/gu, (match: string) =>
    match.slice(1).toUpperCase()
  );
  const pascal = camel.charAt(0).toUpperCase() + camel.slice(1);
  return content
    .replaceAll("NestArchPreviewMarker", pascal)
    .replaceAll("nestArchPreviewMarker", camel)
    .replaceAll(PREVIEW_PROJECT_NAME, name)
    .replaceAll("nest_arch_preview_marker", name.replaceAll("-", "_"));
};
