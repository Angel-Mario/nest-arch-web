// Compare fixtures sequentially to keep file ownership and failures explicit.
// oxlint-disable no-await-in-loop
import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import nodePath from "node:path";
import { test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";

import { ProjectGenerator } from "../private/nest-arch/runtime.mjs";
import { configFromWizard } from "../src/lib/project-preview/client";
import {
  codeLines,
  normalizeCodeSource,
} from "../src/lib/project-preview/code-lines";
import {
  canonicalConfig,
  normalizePreviewConfig,
  personalizePreview,
  PREVIEW_PROJECT_NAME,
} from "../src/lib/project-preview/config";
import type { ProjectPreview } from "../src/lib/project-preview/config";
import { fileIcon } from "../src/lib/project-preview/file-presentation";
import manifest from "../src/lib/project-preview/generated/manifest.json";
import { highlightCode } from "../src/lib/project-preview/highlight";
import {
  createPreviewCache,
  localPreviewStore,
  previewKey,
} from "../src/server/project-preview/cache";
import {
  generatePreview,
  previewContext,
  UnsupportedPreviewError,
  validatePreview,
} from "../src/server/project-preview/generate";

const { join, resolve } = nodePath;

test("DTO files use the standard TypeScript icon", () => {
  assert.equal(fileIcon("src/users/create-user.dto.ts"), "typescript");
  assert.equal(fileIcon("src/users/users.controller.ts"), "nest-controller");
});

test("README display preserves every character when generated files mix Windows and Unix line endings", async () => {
  const source =
    "# Project\r\n\r\n## Setup\n\n```bash\n  pnpm install\n```\r\n\r\npnpm test:cov\r\n";
  const expected =
    "# Project\n\n## Setup\n\n```bash\n  pnpm install\n```\n\npnpm test:cov\n";
  const display = normalizeCodeSource(source);
  assert.equal(display, expected);
  const plainLines = codeLines(display, null);
  assert.equal(plainLines.map((line) => line.text).join("\n"), expected);
  for (const dark of [true, false]) {
    const tokens = await highlightCode(display, "README.md", dark);
    const lines = codeLines(display, tokens);
    assert.equal(
      lines
        .map((line) => line.tokens.map((token) => token.content).join(""))
        .join("\n"),
      expected
    );
    assert.equal(lines.length, plainLines.length);
  }
  assert.ok(source.includes("\r\n"));
});

test("browser highlighting preserves source text and supports preview grammars in both themes", async () => {
  const fixtures = [
    [
      "main.ts",
      '\n\n// <script> remains text\nconst names: string[] = ["Nest"];\n',
    ],
    ["package.json", '{ "private": true, "name": "my-app" }\n'],
    ["nest-arch.jsonc", '// configuration\n{ "projectType": "single" }\n'],
    ["docker-compose.yml", "services:\n  api:\n    image: node:24\n"],
    ["README.md", "# Setup\n\nRun `pnpm dev`.\n"],
    [
      "schema.prisma",
      "model User {\n  id Int @id @default(autoincrement())\n}\n",
    ],
    ["bunfig.toml", "[install]\nexact = true\n"],
    ["setup.sh", '#!/bin/sh\necho "Nest"\n'],
    ["Dockerfile", "FROM node:24\nWORKDIR /app\n"],
    [
      ".env.example",
      '# Database\nPORT=3000\nDATABASE_URL="postgresql://localhost/app"\n',
    ],
    [".gitignore", "node_modules\n.env\n"],
  ];
  for (const [path, content] of fixtures) {
    for (const dark of [true, false]) {
      const tokens = await highlightCode(content ?? "", path ?? "", dark);
      assert.equal(
        tokens.map((token) => token.content).join(""),
        content,
        path
      );
      assert.equal(
        new Set(tokens.map((token) => token.offset)).size,
        tokens.length
      );
    }
  }
  const tokens = await highlightCode("const port = 3000;\n", "main.ts", true);
  assert.ok(
    new Set(tokens.map((token) => token.color).filter(Boolean)).size > 1
  );
});

test("equivalent selections and UI-only preferences reuse the same preview identity", () => {
  const first = normalizePreviewConfig({
    database: ["postgresql"],
    extras: ["swagger", "docker", "swagger"],
    orm: ["prisma"],
  });
  const second = normalizePreviewConfig({
    database: ["postgresql"],
    extras: ["docker", "swagger"],
    orm: ["prisma"],
    prismaVersion: "7",
  });
  assert.equal(canonicalConfig(first), canonicalConfig(second));
  assert.equal(previewKey(first), previewKey(second));
  assert.equal(
    previewKey(
      configFromWizard({
        ...first,
        initGit: "yes",
        installDependencies: "yes",
        projectName: "first-app",
      })
    ),
    previewKey(
      configFromWizard({
        ...second,
        initGit: "no",
        installDependencies: "no",
        projectName: "second-app",
      })
    )
  );
});

test("unused Ultracite settings do not fragment the cache", () => {
  assert.equal(
    previewKey(normalizePreviewConfig({ ultraciteAgents: ["claude"] })),
    previewKey(normalizePreviewConfig({}))
  );
});

test("project names are personalized locally in paths and all generated case variants", () => {
  const sample = `${PREVIEW_PROJECT_NAME} NestArchPreviewMarker nestArchPreviewMarker nest_arch_preview_marker`;
  assert.equal(
    personalizePreview(sample, "orders-api"),
    "orders-api OrdersApi ordersApi orders_api"
  );
});

test("rejects monorepos, path injection, unknown selections and unsupported compositions", () => {
  assert.throws(() => normalizePreviewConfig({ projectType: "monorepo" }));
  assert.throws(() => normalizePreviewConfig({ projectName: "../../private" }));
  assert.throws(() => normalizePreviewConfig({ database: ["unknown"] }));
  assert.throws(
    () =>
      validatePreview({
        ...normalizePreviewConfig({ database: ["mongodb"], orm: ["prisma"] }),
        prismaVersion: "7",
      }),
    UnsupportedPreviewError
  );
  assert.throws(
    () =>
      validatePreview(
        normalizePreviewConfig({
          addons: ["ultracite"],
          formatter: "biome",
          ultraciteAgents: ["arbitrary-cache-key"],
        })
      ),
    UnsupportedPreviewError
  );
});

test("presets have the canonical key and contain generated files with example metadata", async () => {
  for (const preset of manifest.presets) {
    const config = normalizePreviewConfig(preset.config);
    assert.equal(preset.key, previewKey(config));
    const preview: ProjectPreview = JSON.parse(
      await readFile(join(process.cwd(), "public", preset.url), "utf-8")
    );
    assert.equal(preview.version, manifest.version);
    assert.equal(preview.key, preset.key);
    assert.ok(preview.files.some((file) => file.path === "package.json"));
    assert.ok(
      preview.files
        .find((file) => file.path === "nest-arch.jsonc")
        ?.content.includes("<generated-at-creation>")
    );
  }
});

test("persistent cache survives a new loader, coalesces misses, and invalidates by version", async () => {
  const directory = await mkdtemp(join(tmpdir(), "preview-cache-test-"));
  try {
    let generations = 0;
    const generate = async (
      config: ReturnType<typeof normalizePreviewConfig>,
      version: string,
      key: string
    ): Promise<ProjectPreview> => {
      generations += 1;
      await delay(5);
      return {
        files: [{ content: canonicalConfig(config), path: "config.json" }],
        key,
        version,
      };
    };
    const store = localPreviewStore(directory);
    const config = normalizePreviewConfig({});
    const load = createPreviewCache(store, generate);
    const results = await Promise.all([
      load(config, "1.0.0-a"),
      load(config, "1.0.0-a"),
      load(config, "1.0.0-a"),
    ]);
    assert.deepEqual(results[0], results[1]);
    assert.equal(generations, 1);
    await createPreviewCache(store, generate)(config, "1.0.0-a");
    assert.equal(generations, 1);
    await load(config, "1.0.0-b");
    assert.equal(generations, 2);
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
});

test("failed generations can be retried and do not become cached responses", async () => {
  let calls = 0;
  const load = createPreviewCache(
    { read: () => Promise.resolve(null), write: () => Promise.resolve() },
    (_, version, key) => {
      calls += 1;
      if (calls === 1) {
        return Promise.reject(new Error("temporary failure"));
      }
      return Promise.resolve({ files: [], key, version });
    }
  );
  const config = normalizePreviewConfig({});
  await assert.rejects(load(config, "1.0.0"), /temporary failure/u);
  const recovered = await load(config, "1.0.0");
  assert.equal(recovered.version, "1.0.0");
  assert.equal(calls, 2);
});

test("preview matches real generator output, including programmatic authentication files", async () => {
  const config = normalizePreviewConfig({
    auth: "passport",
    database: ["postgresql"],
    extras: ["docker", "swagger", "todo-example"],
    orm: ["prisma"],
  });
  const templatesDir = resolve("private/nest-arch/templates");
  const preview = await generatePreview(
    config,
    manifest.version,
    previewKey(config),
    manifest.generatorVersion,
    templatesDir
  );
  const directory = await mkdtemp(join(tmpdir(), "preview-equivalence-test-"));
  try {
    const result = await new ProjectGenerator(directory, {
      generatorVersion: manifest.generatorVersion,
      templatesDir,
    }).generate(previewContext(config));
    assert.equal(result.success, true, result.error);
    let count = 0;
    const compare = async (folder: string, prefix = ""): Promise<void> => {
      for (const entry of await readdir(folder, { withFileTypes: true })) {
        const path = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
          await compare(join(folder, entry.name), path);
        } else {
          count += 1;
          const raw = await readFile(join(folder, entry.name), "utf-8");
          const content = raw.replaceAll(
            /"createdAt":\s*"[^"]+"/gu,
            '"createdAt": "<generated-at-creation>"'
          );
          assert.equal(
            preview.files.find((file) => file.path === path)?.content,
            content,
            path
          );
        }
      }
    };
    await compare(directory);
    assert.equal(preview.files.length, count);
    assert.ok(preview.files.some((file) => file.path.startsWith("src/auth/")));
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
});

test("ESLint and Prettier can be selected together and previewed", async () => {
  const config = normalizePreviewConfig({
    formatter: "eslint-prettier-no-stylelint",
  });
  const result = await generatePreview(
    config,
    manifest.version,
    "eslint-prettier-test",
    manifest.generatorVersion
  );
  assert.ok(result.files.some((file) => file.path === "package.json"));
  const metadata = result.files.find((file) => file.path === "nest-arch.jsonc");
  assert.ok(
    metadata?.content.includes('"formatter": "eslint-prettier-no-stylelint"')
  );
});

test("Prisma versions retain wizard selections and use distinct preview identities", () => {
  const prisma7 = normalizePreviewConfig({
    database: ["postgresql"],
    orm: ["prisma"],
    prismaVersion: "7",
  });
  const prisma8 = normalizePreviewConfig({ ...prisma7, prismaVersion: "8" });
  assert.equal(configFromWizard(prisma8).prismaVersion, "8");
  assert.notEqual(previewKey(prisma7), previewKey(prisma8));
  assert.equal(
    normalizePreviewConfig({ ...prisma8, orm: [] }).prismaVersion,
    undefined
  );
});

test("pending MongoDB Prisma 8 preview rejects authentication and unsupported transports", () => {
  const mongo = normalizePreviewConfig({
    database: ["mongodb"],
    orm: ["prisma"],
    prismaVersion: "8",
  });
  assert.doesNotThrow(() => validatePreview(mongo));
  assert.throws(
    () => validatePreview({ ...mongo, auth: "passport" }),
    UnsupportedPreviewError
  );
  assert.throws(
    () => validatePreview({ ...mongo, httpProvider: "fastify" }),
    UnsupportedPreviewError
  );
  assert.throws(
    () =>
      validatePreview({
        ...mongo,
        architecture: "nest-microservice",
        microservices: ["redis"],
      }),
    UnsupportedPreviewError
  );
});

test("Prisma 8 starter previews contain database-specific runtimes and contract files", async () => {
  // oxlint-disable no-await-in-loop
  for (const [id, runtime] of [
    ["postgresql-prisma8", "@prisma/orm-postgres"],
    ["mongodb-prisma8", "@prisma/orm-mongo"],
  ]) {
    const preset = manifest.presets.find((entry) => entry.id === id);
    assert.ok(preset);
    const preview: ProjectPreview = JSON.parse(
      await readFile(join(process.cwd(), "public", preset.url), "utf-8")
    );
    const packageFile = preview.files.find(
      (file) => file.path === "package.json"
    );
    assert.ok(packageFile);
    assert.ok(JSON.parse(packageFile.content).dependencies[runtime]);
    assert.ok(
      preview.files.some((file) => file.path === "src/prisma/contract.prisma")
    );
    assert.equal(preset.config.prismaVersion, "8");
  }
  // oxlint-enable no-await-in-loop
});
