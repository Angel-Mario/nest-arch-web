"use client";

import { Badge } from "@nest-arch-web/ui/components/badge";
import { Button } from "@nest-arch-web/ui/components/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@nest-arch-web/ui/components/input-group";
import { Label } from "@nest-arch-web/ui/components/label";
import { Skeleton } from "@nest-arch-web/ui/components/skeleton";
import { Check, Copy, Search, TriangleAlert, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useUi } from "@/components/locale-provider";
import { PreviewCode } from "@/components/preview-code";
import {
  configFromWizard,
  fetchProjectPreview,
  PreviewRequestError,
} from "@/lib/project-preview/client";
import {
  canonicalConfig,
  normalizePreviewConfig,
  personalizePreview,
} from "@/lib/project-preview/config";
import type {
  PreviewConfig,
  PreviewFile,
  ProjectPreview,
} from "@/lib/project-preview/config";
import { fileIcon, folderIcon } from "@/lib/project-preview/file-presentation";
import manifest from "@/lib/project-preview/generated/manifest.json";
import { previewMessages } from "@/lib/project-preview/messages";

interface FileTreeProps {
  files: PreviewFile[];
  prefix?: string;
  selected: string;
  onSelect: (path: string) => void;
  expandFolders?: boolean;
}

const COLLAPSED_FOLDERS = new Set([
  "src/auth/",
  "src/database/adapters/",
  "test/",
]);

const FileTree = ({
  files,
  prefix = "",
  selected,
  onSelect,
  expandFolders = false,
}: FileTreeProps) => {
  const directories = new Set<string>();
  const leaves: PreviewFile[] = [];
  for (const file of files) {
    const rest = file.path.slice(prefix.length);
    const slash = rest.indexOf("/");
    if (slash === -1) {
      leaves.push(file);
    } else {
      directories.add(rest.slice(0, slash));
    }
  }
  return (
    <ul className="flex flex-col gap-0.5">
      {[...directories].toSorted().map((directory) => {
        const childPrefix = `${prefix}${directory}/`;
        return (
          <li key={childPrefix}>
            <details
              open={expandFolders || !COLLAPSED_FOLDERS.has(childPrefix)}
            >
              <summary className="text-muted-foreground focus-visible:outline-ring cursor-pointer px-2 py-1.5 text-xs focus-visible:outline-2">
                <Image
                  src={`/material-icons/${folderIcon(directory)}.svg`}
                  width={16}
                  height={16}
                  alt=""
                  className="mr-1.5 inline size-4"
                />
                {directory}
              </summary>
              <div className="border-border ml-3 border-l pl-2">
                <FileTree
                  files={files.filter((file) =>
                    file.path.startsWith(childPrefix)
                  )}
                  prefix={childPrefix}
                  selected={selected}
                  onSelect={onSelect}
                  expandFolders={expandFolders}
                />
              </div>
            </details>
          </li>
        );
      })}
      {leaves.map((file) => (
        <li key={file.path}>
          <Button
            variant={selected === file.path ? "secondary" : "ghost"}
            size="sm"
            className="w-full cursor-pointer justify-start"
            aria-current={selected === file.path ? "page" : undefined}
            onClick={() => onSelect(file.path)}
            title={file.path}
          >
            <Image
              src={`/material-icons/${fileIcon(file.path)}.svg`}
              width={16}
              height={16}
              alt=""
              className="size-4 shrink-0"
            />
            <span className="truncate">{file.path.slice(prefix.length)}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
};

interface ProjectExplorerProps {
  state?: Record<string, unknown>;
  projectName?: string;
  onPresetSelect?: (config: PreviewConfig) => void;
  onClose: () => void;
}

const ProjectExplorer = ({
  state,
  projectName = "my-nest-app",
  onPresetSelect,
  onClose,
}: ProjectExplorerProps) => {
  const { locale } = useUi();
  const t = previewMessages[locale];
  const dialog = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const searchToggle = useRef<HTMLButtonElement>(null);
  const [name, setName] = useState(projectName);
  const [config, setConfig] = useState<PreviewConfig | null>(() => {
    try {
      return state
        ? configFromWizard(state)
        : normalizePreviewConfig(manifest.presets[0]?.config ?? {});
    } catch {
      return null;
    }
  });
  const activePreset = config
    ? manifest.presets.find(
        (preset) =>
          canonicalConfig(normalizePreviewConfig(preset.config)) ===
          canonicalConfig(config)
      )?.id
    : undefined;
  const [preview, setPreview] = useState<ProjectPreview | null>(null);
  const [failure, setFailure] = useState<PreviewRequestError | null>(null);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("package.json");
  const [search, setSearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    if (mobileSearchOpen) {
      searchInput.current?.focus();
    }
  }, [mobileSearchOpen]);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setFailure(null);
      setPreview(null);
      if (!config) {
        setFailure(new PreviewRequestError("configuration"));
        setLoading(false);
        return;
      }
      try {
        const result = await fetchProjectPreview(config);
        if (active) {
          setPreview(result);
        }
      } catch (error) {
        if (active) {
          setFailure(
            error instanceof PreviewRequestError
              ? error
              : new PreviewRequestError("generation")
          );
        }
      }
      if (active) {
        setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [config]);
  const current =
    preview?.files.find((file) => file.path === selected) ?? preview?.files[0];
  const content = current ? personalizePreview(current.content, name) : "";
  const visible =
    preview?.files.filter((file) =>
      file.path.toLowerCase().includes(search.toLowerCase())
    ) ?? [];
  const validName = /^[a-z][a-z0-9-]{0,63}$/u.test(name);
  const errorCode = failure?.code;
  const errorMessage =
    errorCode && errorCode in t.errors
      ? t.errors[errorCode as keyof typeof t.errors]
      : t.errors.generation;
  const copyFile = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedPath(current?.path ?? null);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
    setSearch("");
    searchToggle.current?.focus();
  };
  return (
    <dialog
      ref={dialog}
      aria-labelledby="project-explorer-title"
      onCancel={onClose}
      className="bg-background text-foreground fixed inset-4 m-auto h-[min(88dvh,850px)] max-h-none w-[min(1150px,calc(100%-2rem))] max-w-none overflow-hidden rounded-xl border p-0 shadow-2xl backdrop:bg-black/65"
    >
      <div className="flex h-full flex-col">
        <header className="border-border flex shrink-0 items-start justify-between gap-4 border-b p-4 sm:p-5">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="project-explorer-title" className="text-lg font-semibold">
                {t.title}
              </h2>
              <Badge variant="outline">v{manifest.generatorVersion}</Badge>
            </div>
            <p className="text-muted-foreground text-xs">{t.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={t.close}
            onClick={onClose}
            className="cursor-pointer"
          >
            <X />
          </Button>
        </header>
        <div className="border-border flex shrink-0 items-start gap-2 border-b p-4 sm:gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <Label htmlFor="preview-project-name" className="h-4">
              {t.name}
            </Label>
            <InputGroup>
              <InputGroupInput
                id="preview-project-name"
                className="text-base sm:text-xs"
                value={name}
                maxLength={64}
                aria-invalid={!validName}
                aria-describedby={validName ? undefined : "preview-name-error"}
                onChange={(event) => {
                  setName(event.target.value);
                  setCopiedPath(null);
                }}
              />
            </InputGroup>
            {!validName && (
              <p id="preview-name-error" className="text-destructive text-xs">
                {t.nameError}
              </p>
            )}
          </div>
          <div
            id="preview-file-search-field"
            className={`${mobileSearchOpen ? "flex" : "hidden"} min-w-0 flex-1 flex-col gap-1.5 sm:flex`}
          >
            <Label htmlFor="preview-file-search" className="h-4">
              <span className="sr-only sm:not-sr-only">{t.search}</span>
            </Label>
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                ref={searchInput}
                id="preview-file-search"
                className="text-base sm:text-xs"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape" && mobileSearchOpen) {
                    event.preventDefault();
                    event.stopPropagation();
                    closeMobileSearch();
                  }
                }}
              />
            </InputGroup>
          </div>
          <div className="flex shrink-0 flex-col gap-1.5 sm:hidden">
            <span aria-hidden="true" className="h-4" />
            <Button
              ref={searchToggle}
              type="button"
              variant="outline"
              size="icon"
              className="size-8 cursor-pointer"
              aria-label={mobileSearchOpen ? t.closeSearch : t.search}
              aria-expanded={mobileSearchOpen}
              aria-controls="preview-file-search-field"
              onClick={() => {
                if (mobileSearchOpen) {
                  closeMobileSearch();
                } else {
                  setMobileSearchOpen(true);
                }
              }}
            >
              {mobileSearchOpen ? <X /> : <Search />}
            </Button>
          </div>
        </div>
        <div
          className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[260px_1fr]"
          aria-busy={loading}
        >
          <nav
            aria-label={t.files}
            className="preview-scrollbar border-border flex max-h-40 min-h-0 flex-col gap-3 overflow-auto border-b p-3 sm:max-h-none sm:border-r sm:border-b-0"
          >
            <p className="text-muted-foreground text-xs">
              {t.files}
              {preview ? ` · ${preview.files.length}` : ""}
            </p>
            {loading ? (
              <>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-36" />
              </>
            ) : (
              <FileTree
                files={visible}
                selected={current?.path ?? ""}
                expandFolders={search.trim().length > 0}
                onSelect={(path) => {
                  setSelected(path);
                  setCopiedPath(null);
                  setCopyError(false);
                }}
              />
            )}
            {!loading && preview && visible.length === 0 && (
              <p className="text-muted-foreground text-xs">{t.empty}</p>
            )}
          </nav>
          <div className="flex min-h-0 min-w-0 flex-col">
            {loading && (
              <output className="text-muted-foreground flex flex-col gap-4 p-6">
                <p>{t.loading}</p>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </output>
            )}
            {failure && (
              <div role="alert" className="flex flex-col gap-4 p-6">
                <p>{errorMessage}</p>
                {failure.code === "unsupported" && (
                  <pre className="text-muted-foreground text-xs whitespace-pre-wrap">
                    {failure.message}
                  </pre>
                )}
                <Button
                  variant="outline"
                  className="cursor-pointer self-start"
                  onClick={() =>
                    setConfig((value) => (value ? { ...value } : null))
                  }
                >
                  {t.retry}
                </Button>
              </div>
            )}
            {current && !loading && (
              <>
                <div className="border-border flex items-center justify-between gap-3 border-b px-4 py-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <Image
                      src={`/material-icons/${fileIcon(current.path)}.svg`}
                      width={16}
                      height={16}
                      alt=""
                      className="size-4 shrink-0"
                    />
                    <p className="truncate font-mono text-xs">{current.path}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="cursor-pointer"
                    disabled={!validName}
                    onClick={copyFile}
                  >
                    {copiedPath === current.path ? (
                      <Check data-icon="inline-start" />
                    ) : (
                      <Copy data-icon="inline-start" />
                    )}
                    {copiedPath === current.path ? t.copied : t.copy}
                  </Button>
                </div>
                <pre
                  aria-label={current.path}
                  className="preview-scrollbar focus-visible:outline-ring min-h-0 flex-1 overflow-auto p-4 font-mono text-xs leading-6 focus-visible:outline-2"
                >
                  <PreviewCode content={content} path={current.path} />
                </pre>
                {copyError && (
                  <output className="text-destructive px-4 text-xs">
                    {t.copyError}
                  </output>
                )}
              </>
            )}
          </div>
        </div>
        <footer className="border-border flex shrink-0 flex-col gap-3 border-t p-4">
          <div className="hidden flex-wrap items-center gap-1.5 sm:flex">
            <span className="text-muted-foreground mr-2 text-xs">
              {t.presets}
            </span>
            {manifest.presets.map((preset) => (
              <Button
                key={preset.id}
                variant={activePreset === preset.id ? "default" : "outline"}
                aria-pressed={activePreset === preset.id}
                size="xs"
                className="cursor-pointer"
                onClick={() => {
                  const presetConfig = normalizePreviewConfig(preset.config);
                  setConfig(presetConfig);
                  onPresetSelect?.(presetConfig);
                  setSelected("package.json");
                  setCopiedPath(null);
                  setCopyError(false);
                }}
              >
                {activePreset === preset.id && (
                  <Check data-icon="inline-start" />
                )}
                {preset.label}
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div
              role="note"
              className="text-muted-foreground hidden min-w-0 flex-1 items-start gap-2 text-xs sm:flex"
            >
              <TriangleAlert
                aria-hidden="true"
                className="mt-0.5 size-3.5 shrink-0"
              />
              <p>
                <span className="font-semibold">{t.notice}.</span> {t.note}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer self-end"
              onClick={onClose}
            >
              {t.configure}
            </Button>
          </div>
        </footer>
      </div>
    </dialog>
  );
};
export default ProjectExplorer;
