import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import { BlobNotFoundError, head, put } from "@vercel/blob";

import { canonicalConfig } from "../../lib/project-preview/config";
import type {
  PreviewConfig,
  ProjectPreview,
} from "../../lib/project-preview/config";

const { dirname, join } = path;

export const previewKey = (config: PreviewConfig): string =>
  createHash("sha256").update(canonicalConfig(config)).digest("hex");

export interface PreviewStore {
  read: (version: string, key: string) => Promise<ProjectPreview | null>;
  write: (preview: ProjectPreview) => Promise<void>;
}

export class PreviewStorageUnavailableError extends Error {
  name = "PreviewStorageUnavailableError";
}

const pathFor = (version: string, key: string): string => {
  if (!/^[a-zA-Z0-9.-]+$/u.test(version) || !/^[a-f0-9]{64}$/u.test(key)) {
    throw new Error("Invalid preview cache identity");
  }
  return `project-previews/${version}/${key}.json`;
};

export const localPreviewStore = (root: string): PreviewStore => ({
  async read(version, key) {
    try {
      return JSON.parse(
        await readFile(join(root, pathFor(version, key)), "utf-8")
      ) as ProjectPreview;
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return null;
      }
      throw error;
    }
  },
  async write(preview) {
    const target = join(root, pathFor(preview.version, preview.key));
    await mkdir(dirname(target), { recursive: true });
    const temporary = `${target}.${crypto.randomUUID()}.tmp`;
    await writeFile(temporary, JSON.stringify(preview));
    await rename(temporary, target);
  },
});

export const blobPreviewStore = (token: string): PreviewStore => ({
  async read(version, key) {
    try {
      const blob = await head(pathFor(version, key), { token });
      const response = await fetch(blob.url, {
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        throw new Error("Cannot read cached project preview");
      }
      return (await response.json()) as ProjectPreview;
    } catch (error) {
      if (error instanceof BlobNotFoundError) {
        return null;
      }
      throw error;
    }
  },
  async write(preview) {
    await put(pathFor(preview.version, preview.key), JSON.stringify(preview), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 31_536_000,
      contentType: "application/json",
      token,
    });
  },
});

export const configuredPreviewStore = (
  environment: NodeJS.ProcessEnv = process.env
): PreviewStore => {
  if (environment.NODE_ENV === "development") {
    return localPreviewStore(join(process.cwd(), ".cache"));
  }
  if (environment.BLOB_READ_WRITE_TOKEN) {
    return blobPreviewStore(environment.BLOB_READ_WRITE_TOKEN);
  }
  if (environment.VERCEL || environment.NODE_ENV === "production") {
    throw new PreviewStorageUnavailableError(
      "On-demand previews require persistent storage"
    );
  }
  return localPreviewStore(join(process.cwd(), ".cache"));
};

// Coalesce misses in this process. Persistent storage and the CDN handle reuse
// across instances; this map is never used as the durable cache.
export const createPreviewCache = (
  store: PreviewStore,
  generate: (
    config: PreviewConfig,
    version: string,
    key: string
  ) => Promise<ProjectPreview>
) => {
  const pending = new Map<string, Promise<ProjectPreview>>();
  return async (
    config: PreviewConfig,
    version: string
  ): Promise<ProjectPreview> => {
    const key = previewKey(config);
    const identity = `${version}/${key}`;
    const existing = pending.get(identity);
    if (existing) {
      return await existing;
    }
    const work = async (): Promise<ProjectPreview> => {
      const cached = await store.read(version, key);
      if (cached) {
        if (cached.version !== version || cached.key !== key) {
          throw new Error("Cached project preview has an invalid identity");
        }
        return cached;
      }
      const preview = await generate(config, version, key);
      await store.write(preview);
      return preview;
    };
    const promise = work();
    pending.set(identity, promise);
    try {
      return await promise;
    } finally {
      pending.delete(identity);
    }
  };
};
