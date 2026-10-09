import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import nodePath from "node:path";

import {
  ProjectGenerator,
  getUnsupportedSelections,
  options,
} from "../../../private/nest-arch/runtime.mjs";
import type {
  PreviewConfig,
  PreviewFile,
  ProjectPreview,
} from "../../lib/project-preview/config";
import { PREVIEW_PROJECT_NAME } from "../../lib/project-preview/config";

const { join, resolve, sep } = nodePath;

export class UnsupportedPreviewError extends Error {
  name = "UnsupportedPreviewError";
}

export const previewContext = (config: PreviewConfig) => ({
  ...config,
  description: `${PREVIEW_PROJECT_NAME} NestJS application`,
  initGit: false,
  installDependencies: false,
  projectName: PREVIEW_PROJECT_NAME,
});

export const validatePreview = (config: PreviewConfig): void => {
  for (const [field, catalog] of [
    ["ultraciteAgents", "ultraciteAgentOptions"],
    ["ultraciteEditors", "ultraciteEditorOptions"],
    ["ultraciteHooks", "ultraciteHookOptions"],
  ] as const) {
    const allowed = new Set(options[catalog]?.map(({ value }) => value));
    if (config[field].some((value) => !allowed.has(value))) {
      throw new UnsupportedPreviewError(
        "Select a supported Ultracite integration from the wizard."
      );
    }
  }
  const issues = getUnsupportedSelections(previewContext(config));
  if (issues.length > 0) {
    throw new UnsupportedPreviewError(
      issues.map(({ message }) => message).join("\n")
    );
  }
};

const collectFiles = async (
  directory: string,
  prefix = ""
): Promise<PreviewFile[]> => {
  const files: PreviewFile[] = [];
  // Reading each file in order bounds filesystem pressure on a cache miss.
  // oxlint-disable no-await-in-loop
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(join(directory, entry.name), path)));
    } else if (entry.isFile()) {
      const content = await readFile(join(directory, entry.name), "utf-8");
      files.push({
        content: content.replaceAll(
          /"createdAt":\s*"[^"]+"/gu,
          '"createdAt": "<generated-at-creation>"'
        ),
        path,
      });
    }
  }
  // oxlint-enable no-await-in-loop
  return files.toSorted((left, right) => left.path.localeCompare(right.path));
};

export const generatePreview = async (
  config: PreviewConfig,
  version: string,
  key: string,
  generatorVersion: string,
  templatesDir = join(process.cwd(), "private/nest-arch/templates")
): Promise<ProjectPreview> => {
  validatePreview(config);
  const directory = await mkdtemp(join(tmpdir(), "nest-arch-preview-"));
  const target = resolve(directory);
  const root = `${resolve(tmpdir())}${sep}`;
  if (
    !target.startsWith(root) ||
    !target.slice(root.length).startsWith("nest-arch-preview-")
  ) {
    throw new Error("Invalid preview cleanup directory");
  }
  try {
    const generator = new ProjectGenerator(directory, {
      generatorVersion,
      templatesDir,
    });
    const result = await generator.generate(previewContext(config));
    if (!result.success) {
      throw new Error(result.error ?? "Project preview generation failed");
    }
    const files = await collectFiles(directory);
    if (
      files.length > 300 ||
      Buffer.byteLength(JSON.stringify(files)) > 2_000_000
    ) {
      throw new Error("Project preview exceeds the supported size");
    }
    return { files, key, version };
  } finally {
    await rm(target, { force: true, recursive: true });
  }
};
