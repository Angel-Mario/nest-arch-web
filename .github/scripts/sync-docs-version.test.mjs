import assert from "node:assert/strict";
import { test } from "node:test";

import { documentedReleaseUpdate } from "./sync-docs-version.mjs";

test("proposes the version of the synchronized generator and remains idempotent", () => {
  assert.deepEqual(documentedReleaseUpdate("0.5.2", "0.5.2", "0.5.1"), {
    version: "0.5.2",
  });
  assert.deepEqual(documentedReleaseUpdate("0.5.2", "0.5.2", "0.5.2"), {
    version: "0.5.2",
  });
});

test("rejects prereleases, missing versions and a version that differs from the generator", () => {
  for (const version of [
    undefined,
    "1.0.0-beta.1",
    "latest",
    "1.2",
    "01.2.3",
  ]) {
    assert.throws(() => documentedReleaseUpdate(version, "0.5.2", "0.5.1"));
  }
  assert.throws(() => documentedReleaseUpdate("0.5.3", "0.5.2", "0.5.1"));
});

test("does not downgrade the reviewed documentation and compares version numbers numerically", () => {
  for (const version of ["0.4.99", "0.5.0", "0.5.1"]) {
    assert.throws(() => documentedReleaseUpdate(version, version, "0.5.2"));
  }
  assert.deepEqual(documentedReleaseUpdate("0.10.0", "0.10.0", "0.9.9"), {
    version: "0.10.0",
  });
  assert.deepEqual(documentedReleaseUpdate("1.0.0", "1.0.0", "0.99.99"), {
    version: "1.0.0",
  });
});
