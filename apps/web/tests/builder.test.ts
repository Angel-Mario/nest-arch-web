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

test("changing Prisma databases adjusts versions and removes unsupported MongoDB ORMs", () => {
  const postgres = normalizePreviewConfig({
    database: ["postgresql"],
    orm: ["prisma"],
    prismaVersion: "8",
  });
  const mysql = updateBuilderConfig(postgres, "database", ["mysql"]);
  assert.equal(mysql.prismaVersion, "7");
  const mongo = updateBuilderConfig(mysql, "database", ["mongodb"]);
  assert.deepEqual(mongo.orm, ["prisma"]);
  assert.equal(mongo.prismaVersion, "8");
  assert.equal(
    updateBuilderConfig(mongo, "orm", ["none"]).prismaVersion,
    undefined
  );
  const drizzle = normalizePreviewConfig({
    database: ["postgresql"],
    orm: ["drizzle"],
  });
  assert.deepEqual(
    updateBuilderConfig(drizzle, "database", ["mongodb"]).orm,
    []
  );
  const command = buildProjectCommand({
    ...mongo,
    initGit: "no",
    installDependencies: "no",
    projectName: "mongo-api",
  });
  assert.ok(command.includes("--prisma-version 8"));
  assert.ok(
    buildProjectCommand({
      ...mysql,
      initGit: "no",
      installDependencies: "no",
      projectName: "sql-api",
    }).includes("--prisma-version 7")
  );
});
