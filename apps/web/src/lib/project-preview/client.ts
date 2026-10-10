import { canonicalConfig, normalizePreviewConfig } from "./config";
import type { PreviewConfig, ProjectPreview } from "./config";
import manifest from "./generated/manifest.json";

const cached = new Map<string, ProjectPreview>();
const pending = new Map<string, Promise<ProjectPreview>>();

export class PreviewRequestError extends Error {
  name = "PreviewRequestError";
  code: string;
  constructor(code: string, message?: string) {
    super(message ?? code);
    this.code = code;
  }
}

export const fetchProjectPreview = async (
  input: PreviewConfig
): Promise<ProjectPreview> => {
  const config = canonicalConfig(input);
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(config)
  );
  const key = Array.from(new Uint8Array(bytes), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
  const identity = `${manifest.version}/${key}`;
  const hit = cached.get(identity);
  if (hit) {
    return hit;
  }
  const existing = pending.get(identity);
  if (existing) {
    return await existing;
  }
  const load = async (): Promise<ProjectPreview> => {
    const preset = manifest.presets.find((item) => item.key === key);
    const parameters = new URLSearchParams({
      config,
      key,
      v: manifest.version,
    });
    const response = await fetch(
      preset?.url ?? `/api/project-preview?${parameters}`,
      { signal: AbortSignal.timeout(35_000) }
    );
    if (!response.ok) {
      const failure = (await response.json()) as {
        error?: string;
        message?: string;
      };
      throw new PreviewRequestError(
        failure.error ?? "generation",
        failure.message
      );
    }
    const result = (await response.json()) as ProjectPreview;
    if (
      result.version !== manifest.version ||
      result.key !== key ||
      !Array.isArray(result.files)
    ) {
      throw new PreviewRequestError("version");
    }
    if (cached.size >= 12) {
      const oldest = cached.keys().next().value;
      if (oldest) {
        cached.delete(oldest);
      }
    }
    cached.set(identity, result);
    return result;
  };
  const promise = load();
  pending.set(identity, promise);
  try {
    return await promise;
  } finally {
    pending.delete(identity);
  }
};

// The terminal has UI-only fields and nullable unanswered choices. Neither
// project name nor installation/Git preferences fragment the preview cache.
export const configFromWizard = (
  state: Record<string, unknown>
): PreviewConfig =>
  normalizePreviewConfig({
    addons: state.addons ?? [],
    api: state.api ?? ["rest"],
    architecture: state.architecture ?? "nest-api",
    auth: state.auth ?? "none",
    database: state.database ?? [],
    extras: state.extras ?? [],
    formatter: state.formatter ?? "none",
    httpProvider: state.httpProvider ?? "express",
    microservices: state.microservices ?? [],
    orm: state.orm ?? [],
    packageManager: state.packageManager ?? "pnpm",
    prismaVersion: state.prismaVersion ?? undefined,
    projectType: state.projectType ?? "single",
    ultraciteAgents: state.ultraciteAgents ?? [],
    ultraciteEditors: state.ultraciteEditors ?? [],
    ultraciteHooks: state.ultraciteHooks ?? [],
    ultraciteInstallSkill: state.ultraciteInstallSkill ?? "no",
  });
