// Source hashing and rendering are sequential for deterministic order and bounded memory.
// oxlint-disable no-await-in-loop
import { createHash } from "node:crypto";
import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import nodePath from "node:path";

import { build } from "esbuild";

import {
  canonicalConfig,
  normalizePreviewConfig,
} from "../src/lib/project-preview/config";
import type { PreviewConfig } from "../src/lib/project-preview/config";

const { join, resolve } = nodePath;
const appRoot = resolve(import.meta.dirname, "..");
const sourceRoot = resolve(
  process.argv[2] ?? join(appRoot, "../../../nest-arch")
);
const targetRoot = join(appRoot, "private/nest-arch");
const publicRoot = join(appRoot, "public/project-previews");
const digest = createHash("sha256").update(
  "nest-arch-project-preview-format-1"
);
for (const path of [
  "src/lib/project-preview/config.ts",
  "src/server/project-preview/generate.ts",
  "scripts/sync-project-preview.mts",
  "package.json",
]) {
  digest.update(await readFile(join(appRoot, path)));
}

const hashDirectory = async (directory: string): Promise<void> => {
  const unsortedEntries = await readdir(directory, { withFileTypes: true });
  const entries = unsortedEntries.toSorted((a, b) =>
    a.name.localeCompare(b.name)
  );
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "__tests__") {
        await hashDirectory(path);
      }
    } else if (entry.isFile()) {
      digest.update(path.slice(sourceRoot.length).replaceAll("\\", "/"));
      digest.update(await readFile(path));
    }
  }
};

for (const directory of [
  "packages/core/src",
  "packages/core/templates",
  "packages/shared/src",
]) {
  await hashDirectory(join(sourceRoot, directory));
}
const constantsPath = join(
  sourceRoot,
  "apps/tui/src/constants/createProjectOptions.ts"
);
digest.update(await readFile(constantsPath));
for (const path of [
  "packages/core/package.json",
  "packages/core/references/package.json",
  "apps/tui/package.json",
]) {
  digest.update(await readFile(join(sourceRoot, path)));
}
const tuiPackage: { version: string } = JSON.parse(
  await readFile(join(sourceRoot, "apps/tui/package.json"), "utf-8")
);
const version = `${tuiPackage.version}-${digest.digest("hex").slice(0, 20)}`;
await mkdir(targetRoot, { recursive: true });
await mkdir(join(appRoot, "src/lib/project-preview/generated"), {
  recursive: true,
});

await build({
  bundle: true,
  external: ["handlebars", "ts-morph"],
  format: "esm",
  logLevel: "warning",
  minify: true,
  outfile: join(targetRoot, "runtime.mjs"),
  platform: "node",
  plugins: [
    {
      name: "private-generator-sources",
      setup(plugin) {
        // esbuild's Go regexp engine does not support the JavaScript unicode flag.
        // oxlint-disable-next-line eslint/require-unicode-regexp
        plugin.onResolve({ filter: /^@nest-arch\/shared$/ }, () => ({
          path: join(sourceRoot, "packages/shared/src/index.ts"),
        }));
        // oxlint-disable-next-line eslint/require-unicode-regexp
        plugin.onResolve({ filter: /^@nest-arch\/env\/tui$/ }, () => ({
          namespace: "preview-environment",
          path: "preview-environment",
        }));
        plugin.onLoad(
          // oxlint-disable-next-line eslint/require-unicode-regexp
          { filter: /.*/, namespace: "preview-environment" },
          () => ({
            contents:
              'export const env = { NEST_ARCH_SCHEMA_URL: "./schema.json" };',
            loader: "js",
          })
        );
      },
    },
  ],
  stdin: {
    contents: `export { ProjectGenerator } from ${JSON.stringify(join(sourceRoot, "packages/core/src/generators/ProjectGenerator/ProjectGenerator.ts"))};\nexport { getUnsupportedSelections } from ${JSON.stringify(join(sourceRoot, "packages/core/src/supportPolicy.ts"))};\nexport * as options from ${JSON.stringify(constantsPath)};`,
    resolveDir: sourceRoot,
  },
  target: "node22",
});
await cp(
  join(sourceRoot, "packages/core/templates"),
  join(targetRoot, "templates"),
  { recursive: true }
);
await writeFile(
  join(targetRoot, "runtime.d.mts"),
  `import type { PreviewConfig } from "../../src/lib/project-preview/config";
type Context = PreviewConfig & { projectName: string; description?: string; initGit: boolean; installDependencies: boolean };
export declare class ProjectGenerator {
  constructor(outputDir: string, options: { generatorVersion?: string; templatesDir: string });
  generate(context: Context): Promise<{ success: boolean; error?: string; generatedFiles: string[] }>;
}
export declare function getUnsupportedSelections(context: Context): { code: string; kind: string; message: string }[];
export declare const options: Record<string, { value: string; label: string; description: string }[]>;
`
);

const { options } = await import("../private/nest-arch/runtime.mjs");
const { generatePreview } =
  await import("../src/server/project-preview/generate");
const presets: {
  id: string;
  label: string;
  config: PreviewConfig;
  key: string;
  url: string;
}[] = [];
for (const [id, label, input] of [
  ["rest", "NestJS REST", {}],
  [
    "postgresql",
    "PostgreSQL + Prisma",
    { database: ["postgresql"], orm: ["prisma"] },
  ],
  [
    "sqlserver",
    "SQL Server + Prisma",
    { database: ["sqlserver"], orm: ["prisma"] },
  ],
  ["sqlite", "SQLite + Drizzle", { database: ["sqlite"], orm: ["drizzle"] }],
  ["mongodb", "MongoDB", { database: ["mongodb"] }],
  [
    "redis",
    "Redis microservice",
    { api: [], architecture: "nest-microservice", microservices: ["redis"] },
  ],
] as const) {
  const config = normalizePreviewConfig(input);
  const key = createHash("sha256")
    .update(canonicalConfig(config))
    .digest("hex");
  const preview = await generatePreview(
    config,
    version,
    key,
    tuiPackage.version,
    join(targetRoot, "templates")
  );
  await mkdir(join(publicRoot, version), { recursive: true });
  await writeFile(
    join(publicRoot, version, `${key}.json`),
    JSON.stringify(preview)
  );
  presets.push({
    config,
    id,
    key,
    label,
    url: `/project-previews/${version}/${key}.json`,
  });
}
const manifest = {
  generatorVersion: tuiPackage.version,
  options,
  presets,
  version,
};
await writeFile(
  join(appRoot, "src/lib/project-preview/generated/manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`
);
process.stdout.write(
  `Preview snapshot ${version}: ${presets.length} static presets\n`
);
