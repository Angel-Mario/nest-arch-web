const PACKAGE_NAME = "@nest-arch/tui";
const STABLE_VERSION = /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/u;
const REVALIDATE_SECONDS = 6 * 60 * 60;
const REQUEST_TIMEOUT_MS = 5000;

export async function getLatestNpmVersion(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://registry.npmjs.org/@nest-arch%2Ftui/latest",
      {
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      }
    );
    if (!response.ok) {
      return null;
    }

    const metadata: unknown = await response.json();
    if (
      typeof metadata !== "object" ||
      metadata === null ||
      !("name" in metadata) ||
      metadata.name !== PACKAGE_NAME ||
      !("version" in metadata) ||
      typeof metadata.version !== "string" ||
      !STABLE_VERSION.test(metadata.version)
    ) {
      return null;
    }

    return metadata.version;
  } catch {
    return null;
  }
}
