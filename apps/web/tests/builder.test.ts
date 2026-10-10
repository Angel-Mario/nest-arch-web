import assert from "node:assert/strict";
import { test } from "node:test";

import { updateBuilderConfig } from "../src/lib/builder-config";
import { buildProjectCommand } from "../src/lib/project-command";
import { normalizePreviewConfig } from "../src/lib/project-preview/config";

test("removing the database clears dependent ORM, GraphQL and database-backed auth", () => {
  const config = normalizePreviewConfig({
    api: ["rest", "graphql"],
    auth: "better-auth",
    database: ["postgresql"],
    orm: ["prisma"],
  });
  const next = updateBuilderConfig(config, "database", ["none"]);
  assert.deepEqual(next.database, []);
  assert.deepEqual(next.orm, []);
  assert.deepEqual(next.api, ["rest"]);
  assert.equal(next.auth, "none");
});

test("removing prerequisites clears Scalar UI and all Ultracite integrations", () => {
  const config = normalizePreviewConfig({
    addons: ["scalar-ui", "ultracite"],
    extras: ["swagger"],
    formatter: "biome",
    ultraciteAgents: ["claude"],
    ultraciteEditors: ["zed"],
    ultraciteHooks: ["cursor"],
    ultraciteInstallSkill: "yes",
  });
  const next = updateBuilderConfig(
    updateBuilderConfig(config, "extras", []),
    "formatter",
    ["none"]
  );
  assert.deepEqual(next.addons, []);
  assert.deepEqual(next.ultraciteEditors, []);
  assert.deepEqual(next.ultraciteAgents, []);
  assert.deepEqual(next.ultraciteHooks, []);
  assert.equal(next.ultraciteInstallSkill, "no");
});

test("changing from microservice to API removes transport selections", () => {
  const config = normalizePreviewConfig({
    architecture: "nest-microservice",
    microservices: ["redis"],
  });
  assert.deepEqual(
    updateBuilderConfig(config, "architecture", ["nest-api"]).microservices,
    []
  );
});

test("the command preserves installation preferences and Ultracite choices", () => {
  const config = normalizePreviewConfig({
    addons: ["ultracite"],
    database: ["postgresql"],
    formatter: "biome",
    orm: ["prisma"],
    ultraciteEditors: ["zed"],
    ultraciteHooks: ["cursor"],
    ultraciteInstallSkill: "yes",
  });
  const command = buildProjectCommand({
    ...config,
    initGit: "no",
    installDependencies: "yes",
    projectName: "test-api",
  });
  assert.match(command, /^pnpm dlx @nest-arch\/tui@latest test-api /u);
  assert.ok(command.includes("--database postgresql --orm prisma"));
  assert.ok(command.includes("--install-dependencies yes --no-git"));
  assert.ok(
    command.includes(
      "--ultracite-editors zed --ultracite-hooks cursor --ultracite-install-skill yes"
    )
  );
});
