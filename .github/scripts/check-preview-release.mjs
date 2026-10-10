import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";

const stableVersion = /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/u;
const gitCommit = /^[a-f0-9]{40}$/u;
const packageName = "@nest-arch/tui";
const root = new URL("../../", import.meta.url);
const manifestPath = new URL(
  "apps/web/src/lib/project-preview/generated/manifest.json",
  root
);
const statePath = new URL(
  "apps/web/src/lib/project-preview/generated/release.json",
  root
);
const candidatePath = new URL(".cache/npm-preview-release.json", root);

export const releasePlan = (
  metadata,
  manifest,
  previous,
  documentedVersion = manifest.generatorVersion
) => {
  if (
    metadata.name !== packageName ||
    !stableVersion.test(metadata.version) ||
    !stableVersion.test(manifest.generatorVersion) ||
    !stableVersion.test(documentedVersion)
  ) {
    throw new Error(
      "Automatic preview sync requires stable major.minor.patch versions of @nest-arch/tui"
    );
  }
  const publishedParts = metadata.version.split(".").map(Number);
  const snapshotParts = manifest.generatorVersion.split(".").map(Number);
  for (const [index, value] of publishedParts.entries()) {
    if (value < snapshotParts[index]) {
      return null;
    }
    if (value > snapshotParts[index]) {
      break;
    }
  }
  const ref =
    typeof metadata.gitHead === "string" && gitCommit.test(metadata.gitHead)
      ? metadata.gitHead
      : `refs/tags/${packageName}@${metadata.version}`;
  if (
    previous?.version === metadata.version &&
    previous.ref === ref &&
    previous.previewVersion === manifest.version &&
    documentedVersion === metadata.version
  ) {
    return null;
  }
  return { ref, version: metadata.version };
};

const optionalState = async () => {
  try {
    return JSON.parse(await readFile(statePath, "utf-8"));
  } catch (error) {
    if (error?.code === "ENOENT") {
      return null;
    }
    throw error;
  }
};

const main = async () => {
  const manifest = JSON.parse(await readFile(manifestPath, "utf-8"));
  if (process.argv[2] === "record") {
    const candidate = JSON.parse(await readFile(candidatePath, "utf-8"));
    if (
      !stableVersion.test(candidate.version) ||
      candidate.version !== manifest.generatorVersion
    ) {
      throw new Error(
        "Generated preview does not match the published package version"
      );
    }
    await writeFile(
      statePath,
      `${JSON.stringify({ ...candidate, previewVersion: manifest.version }, null, 2)}\n`
    );
    return;
  }
  const response = await fetch(
    "https://registry.npmjs.org/@nest-arch%2Ftui/latest",
    { signal: AbortSignal.timeout(15_000) }
  );
  if (!response.ok) {
    throw new Error(`npm registry returned ${response.status}`);
  }
  const plan = releasePlan(
    await response.json(),
    manifest,
    await optionalState(),
    JSON.parse(
      await readFile(
        new URL("apps/fumadocs/src/lib/documented-release.json", root),
        "utf-8"
      )
    ).version
  );
  const output = plan
    ? `should_sync=true\nversion=${plan.version}\nref=${plan.ref}\n`
    : "should_sync=false\n";
  if (process.env.GITHUB_OUTPUT) {
    await appendFile(process.env.GITHUB_OUTPUT, output);
  }
  if (plan) {
    await mkdir(new URL(".cache/", root), { recursive: true });
    await writeFile(candidatePath, JSON.stringify(plan));
  }
  process.stdout.write(output);
};

if (process.argv[1] === import.meta.filename) {
  await main();
}
