import assert from "node:assert/strict";
import { test } from "node:test";

import { releasePlan } from "./check-preview-release.mjs";

const manifest = { generatorVersion: "0.5.0", version: "0.5.0-current" };
const published = { name: "@nest-arch/tui", version: "0.5.0" };

test("does not downgrade a development snapshot to an older npm release", () => {
  for (const version of ["0.4.99", "0.0.1"]) {
    assert.equal(releasePlan({ ...published, version }, manifest, null), null);
  }
});

test("bootstraps from the release tag when npm has no gitHead", () => {
  assert.deepEqual(releasePlan(published, manifest, null), {
    ref: "refs/tags/@nest-arch/tui@0.5.0",
    version: "0.5.0",
  });
});

test("reuses a synchronized artifact but detects new releases and changed snapshots", () => {
  const previous = {
    previewVersion: manifest.version,
    ref: "refs/tags/@nest-arch/tui@0.5.0",
    version: "0.5.0",
  };
  assert.equal(releasePlan(published, manifest, previous), null);
  assert.ok(
    releasePlan({ ...published, version: "0.10.0" }, manifest, previous)
  );
  assert.ok(
    releasePlan({ ...published, version: "1.0.0" }, manifest, previous)
  );
  assert.ok(
    releasePlan(published, { ...manifest, version: "0.5.0-changed" }, previous)
  );
});

test("uses validated npm commit metadata and rejects unexpected packages or prereleases", () => {
  const gitHead = "a".repeat(40);
  assert.equal(
    releasePlan({ ...published, gitHead }, manifest, null).ref,
    gitHead
  );
  assert.throws(() =>
    releasePlan({ ...published, name: "other-package" }, manifest, null)
  );
  assert.throws(() =>
    releasePlan({ ...published, version: "1.0.0-beta.1" }, manifest, null)
  );
});
