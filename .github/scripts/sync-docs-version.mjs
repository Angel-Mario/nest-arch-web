import { readFile, writeFile } from "node:fs/promises";

const stableVersion = /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/u;
const root = new URL("../../", import.meta.url);

export const documentedReleaseUpdate = (
  version,
  generatorVersion,
  currentVersion
) => {
  if (
    ![version, generatorVersion, currentVersion].every(
      (value) => typeof value === "string" && stableVersion.test(value)
    )
  ) {
    throw new Error(
      "Documentation synchronization requires stable major.minor.patch versions"
    );
  }
  if (version !== generatorVersion) {
    throw new Error(
      "Documentation version must match the synchronized generator"
    );
  }
  const currentParts = currentVersion.split(".").map(Number);
  for (const [index, part] of version.split(".").map(Number).entries()) {
    if (part < currentParts[index]) {
      throw new Error(
        "Documentation synchronization cannot downgrade the reviewed version"
      );
    }
    if (part > currentParts[index]) {
      break;
    }
  }
  return { version };
};

const main = async () => {
  const manifest = JSON.parse(
    await readFile(
      new URL("apps/web/src/lib/project-preview/generated/manifest.json", root),
      "utf-8"
    )
  );
  const releasePath = new URL(
    "apps/fumadocs/src/lib/documented-release.json",
    root
  );
  const current = JSON.parse(await readFile(releasePath, "utf-8"));
  const release = documentedReleaseUpdate(
    process.argv[2],
    manifest.generatorVersion,
    current.version
  );
  await writeFile(releasePath, `${JSON.stringify(release, null, 2)}\n`);
  process.stdout.write(
    `Documentation review proposed for @nest-arch/tui ${release.version}\n`
  );
};

if (process.argv[1] === import.meta.filename) {
  await main();
}
