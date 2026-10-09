import "server-only";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import {
  canonicalConfig,
  normalizePreviewConfig,
} from "@/lib/project-preview/config";
import manifest from "@/lib/project-preview/generated/manifest.json";
import {
  configuredPreviewStore,
  createPreviewCache,
  previewKey,
  PreviewStorageUnavailableError,
} from "@/server/project-preview/cache";
import {
  generatePreview,
  UnsupportedPreviewError,
  validatePreview,
} from "@/server/project-preview/generate";

export const runtime = "nodejs";
export const maxDuration = 30;

let cachedLoader: ReturnType<typeof createPreviewCache> | undefined;

const loadPreview = () => {
  cachedLoader ??= createPreviewCache(
    configuredPreviewStore(),
    async (config, version, key) =>
      await generatePreview(config, version, key, manifest.generatorVersion)
  );
  return cachedLoader;
};

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  if (url.searchParams.get("v") !== manifest.version) {
    return NextResponse.json(
      {
        error: "version",
        message: "Reload the page to use the current generator version.",
      },
      { status: 409 }
    );
  }
  const raw = url.searchParams.get("config");
  if (!raw || raw.length > 6000) {
    return NextResponse.json({ error: "configuration" }, { status: 400 });
  }
  try {
    const config = normalizePreviewConfig(JSON.parse(raw));
    const key = previewKey(config);
    const parameters = new URLSearchParams({
      config: canonicalConfig(config),
      key,
      v: manifest.version,
    });
    // Canonical URLs prevent query ordering and duplicate selections from
    // fragmenting the CDN cache before the function can normalize them.
    if (url.search !== `?${parameters}`) {
      return NextResponse.redirect(
        new URL(`/api/project-preview?${parameters}`, url),
        307
      );
    }
    const preset = manifest.presets.find((item) => item.key === key);
    if (preset) {
      return NextResponse.redirect(new URL(preset.url, url), 307);
    }
    validatePreview(config);
    const preview = await loadPreview()(config, manifest.version);
    return NextResponse.json(preview, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Vercel-CDN-Cache-Control": "public, s-maxage=31536000",
      },
    });
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof ZodError) {
      return NextResponse.json({ error: "configuration" }, { status: 400 });
    }
    if (error instanceof UnsupportedPreviewError) {
      return NextResponse.json(
        { error: "unsupported", message: error.message },
        { status: 422 }
      );
    }
    if (error instanceof PreviewStorageUnavailableError) {
      return NextResponse.json({ error: "storage" }, { status: 503 });
    }
    return NextResponse.json({ error: "generation" }, { status: 503 });
  }
};
