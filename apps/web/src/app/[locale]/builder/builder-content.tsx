"use client";

import { Badge } from "@nest-arch-web/ui/components/badge";
import { Button } from "@nest-arch-web/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@nest-arch-web/ui/components/field";
import { Input } from "@nest-arch-web/ui/components/input";
import { Separator } from "@nest-arch-web/ui/components/separator";
import { cn } from "@nest-arch-web/ui/lib/utils";
import { Check, FolderTree, RotateCcw, Terminal } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

import { BuilderOptions } from "@/components/builder-options";
import type { BuilderOption } from "@/components/builder-options";
import { BuilderSectionNav } from "@/components/builder-section-nav";
import { useUi } from "@/components/locale-provider";
import { ProjectCommand } from "@/components/project-command";
import { TechnologyIcon } from "@/components/technology-icon";
import { updateBuilderConfig } from "@/lib/builder-config";
import { builderMessages } from "@/lib/builder-messages";
import { buildProjectCommand } from "@/lib/project-command";
import {
  canonicalConfig,
  normalizePreviewConfig,
} from "@/lib/project-preview/config";
import type { PreviewConfig } from "@/lib/project-preview/config";
import manifest from "@/lib/project-preview/generated/manifest.json";
import { previewMessages } from "@/lib/project-preview/messages";
import { technologyStyle } from "@/lib/technologies";

const ProjectExplorer = dynamic(() => import("@/components/project-explorer"), {
  ssr: false,
});
const DEFAULT_CONFIG = normalizePreviewConfig({ formatter: "biome" });
const { options } = manifest;
const noneOption = (label: string, description: string): BuilderOption => ({
  description,
  label,
  value: "none",
});

export const BuilderContent = () => {
  const { locale } = useUi();
  const t = builderMessages[locale];
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [projectName, setProjectName] = useState("my-nest-app");
  const [initGit, setInitGit] = useState<"yes" | "no">("yes");
  const [installDependencies, setInstallDependencies] = useState<"yes" | "no">(
    "yes"
  );
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const validName = /^[a-z][a-z0-9-]{0,63}$/u.test(projectName);
  const state = { ...config, initGit, installDependencies, projectName };
  const command = buildProjectCommand(state);
  let ormDisabledReason: string | undefined;
  if (config.database.length === 0) {
    ormDisabledReason = t.ormRequiresDatabase;
  }
  if (config.database.includes("mongodb")) {
    ormDisabledReason = t.ormNativeMongo;
  }
  const groups: {
    field: keyof PreviewConfig;
    options: BuilderOption[];
    multiple?: boolean;
    notice?: string;
  }[] = [
    {
      field: "projectType",
      options: [
        ...options.projectTypeOptions,
        {
          description: "Monorepo",
          disabledReason: t.comingInV2,
          label: "Turborepo",
          value: "monorepo",
        },
      ],
    },
    {
      field: "architecture",
      options: options.architectureOptions.filter(
        (option) => option.value !== "nest-gateway"
      ),
    },
    { field: "httpProvider", options: options.httpProviderOptions },
    {
      field: "database",
      options: [
        noneOption(t.withoutDatabase, t.noDatabase),
        ...options.databaseOptions,
      ],
    },
    {
      field: "orm",
      notice: ormDisabledReason,
      options: [
        noneOption(t.withoutOrm, t.noOrm),
        ...options.ormOptions.map((option) => ({
          ...option,
          disabledReason: ormDisabledReason,
        })),
      ],
    },
    {
      field: "api",
      multiple: true,
      options: options.apiOptions.map((option) => ({
        ...option,
        disabledReason:
          option.value === "graphql" && config.database.length === 0
            ? t.requiresDatabase
            : undefined,
      })),
    },
    {
      field: "auth",
      options: options.authOptions.map((option) => ({
        ...option,
        disabledReason:
          option.value === "better-auth" && config.database.length === 0
            ? t.requiresDatabase
            : undefined,
        label: option.value === "none" ? t.withoutAuth : option.label,
      })),
    },
    { field: "packageManager", options: options.packageManagerOptions },
    {
      field: "formatter",
      options: options.formatterOptions.map((option) => {
        if (option.value === "none") {
          return {
            ...option,
            description: t.withoutFormatterDescription,
            label: t.withoutFormatter,
          };
        }
        if (option.value === "eslint-prettier-no-stylelint") {
          return { ...option, description: t.formatterDescription };
        }
        return option;
      }),
    },
    {
      field: "extras",
      multiple: true,
      options: options.extraOptions.filter(
        (option) => option.value !== "packages/shared"
      ),
    },
    {
      field: "addons",
      multiple: true,
      notice: config.addons.includes("ultracite")
        ? undefined
        : t.ultraciteRequired,
      options: options.addonOptions.map((option) => {
        let disabledReason: string | undefined;
        if (option.value === "ultracite" && config.formatter === "none") {
          disabledReason = t.requiresFormatter;
        }
        if (
          option.value === "scalar-ui" &&
          !config.extras.includes("swagger")
        ) {
          disabledReason = t.requiresSwagger;
        }
        return { ...option, disabledReason };
      }),
    },
  ];
  {
    groups.splice(3, 0, {
      field: "microservices",
      multiple: true,
      notice:
        config.architecture === "nest-microservice"
          ? undefined
          : t.microservicesRequired,
      options: options.microserviceCommunicationOptions.map((option) => ({
        ...option,
        disabledReason:
          config.architecture === "nest-microservice"
            ? undefined
            : t.microservicesRequired,
      })),
    });
  }
  if (config.addons.includes("ultracite")) {
    groups.push(
      {
        field: "ultraciteEditors",
        multiple: true,
        options: options.ultraciteEditorOptions,
      },
      {
        field: "ultraciteAgents",
        multiple: true,
        options: options.ultraciteAgentOptions,
      },
      {
        field: "ultraciteHooks",
        multiple: true,
        options: options.ultraciteHookOptions,
      },
      {
        field: "ultraciteInstallSkill",
        options: options.ultraciteInstallSkillOptions.map((option) =>
          option.value === "no"
            ? {
                ...option,
                description: t.withoutSkillDescription,
                label: t.withoutSkill,
              }
            : option
        ),
      }
    );
  }
  const selected = [
    config.architecture,
    config.httpProvider,
    config.packageManager,
    config.formatter,
    ...config.database,
    ...config.orm,
    ...config.api,
    config.auth,
    ...config.extras,
    ...config.addons,
    ...config.microservices,
  ].filter((value) => value !== "none");
  const integrations = [
    ...config.ultraciteEditors.map((value) => ({
      field: "ultraciteEditors",
      value,
    })),
    ...config.ultraciteAgents.map((value) => ({
      field: "ultraciteAgents",
      value,
    })),
    ...config.ultraciteHooks.map((value) => ({
      field: "ultraciteHooks",
      value,
    })),
    ...(config.ultraciteInstallSkill === "yes"
      ? [{ field: "ultraciteInstallSkill", value: "yes" }]
      : []),
  ];
  const activePreset = manifest.presets.find(
    (preset) =>
      canonicalConfig(normalizePreviewConfig(preset.config)) ===
      canonicalConfig(config)
  )?.id;
  const labelFor = (value: string) =>
    groups
      .flatMap((group) => group.options)
      .find((option) => option.value === value)?.label ?? value;
  const titleFor = (field: keyof PreviewConfig) =>
    field in t ? t[field as keyof typeof t] : field;
  const reset = () => {
    setConfig(DEFAULT_CONFIG);
    setProjectName("my-nest-app");
    setInitGit("yes");
    setInstallDependencies("yes");
  };
  const installOptions = [
    { description: t.installDependencies, label: t.yes, value: "yes" },
    {
      description: t.manualInstallDescription,
      label: t.manualInstall,
      value: "no",
    },
  ];

  return (
    <main className="bg-background text-foreground mx-auto max-w-[1600px]">
      <header className="border-border flex items-center gap-3 border-b px-4 py-3 sm:px-6 lg:px-8">
        <Terminal className="text-primary size-4 shrink-0" aria-hidden="true" />
        <h1 className="font-mono text-sm font-semibold">Nest Arch / {t.nav}</h1>
        <p className="text-muted-foreground hidden truncate text-xs sm:block">
          {t.configure}
        </p>
      </header>
      <div className="grid lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="preview-scrollbar border-border bg-muted/15 border-b p-4 sm:p-6 lg:sticky lg:top-16 lg:max-h-[calc(100dvh-4rem)] lg:self-start lg:overflow-y-auto lg:border-r lg:border-b-0">
          <div className="flex flex-col gap-6">
            <FieldGroup>
              <Field data-invalid={!validName}>
                <FieldLabel htmlFor="builder-name">{t.name}</FieldLabel>
                <Input
                  aria-label={t.name}
                  id="builder-name"
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  aria-invalid={!validName}
                  aria-describedby={
                    validName ? undefined : "builder-name-error"
                  }
                  maxLength={64}
                  className="font-mono"
                />
                {!validName && (
                  <FieldDescription id="builder-name-error">
                    {previewMessages[locale].nameError}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
            <ProjectCommand command={command} disabled={!validName} />
            <Separator />
            <section
              className="flex flex-col gap-3"
              aria-labelledby="builder-selected"
            >
              <h2
                id="builder-selected"
                className="flex items-center justify-between font-mono text-xs font-semibold uppercase"
              >
                {t.selected}
                <Badge variant="outline">
                  {selected.length + integrations.length}
                </Badge>
              </h2>
              <div className="flex flex-wrap gap-2">
                {selected.map((value) => (
                  <Badge
                    key={value}
                    variant="outline"
                    className="technology-pill gap-1.5 rounded-full px-2.5 py-1"
                    style={technologyStyle(value)}
                  >
                    <TechnologyIcon value={value} className="size-3.5" />
                    {labelFor(value)}
                  </Badge>
                ))}
                {integrations.map(({ field, value }) => (
                  <Badge
                    key={`${field}-${value}`}
                    variant="outline"
                    className="technology-pill gap-1.5 rounded-full px-2.5 py-1"
                    style={technologyStyle(
                      value === "yes" ? "ultracite" : value
                    )}
                  >
                    <TechnologyIcon
                      value={value === "yes" ? "ultracite" : value}
                      className="size-3.5"
                    />
                    {titleFor(field as keyof PreviewConfig)}:{" "}
                    {groups
                      .find((group) => group.field === field)
                      ?.options.find((option) => option.value === value)
                      ?.label ?? value}
                  </Badge>
                ))}
              </div>
            </section>
            <Separator />
            <div className="flex flex-col gap-3">
              <Button
                className="rounded-lg"
                onClick={() => setIsExplorerOpen(true)}
                disabled={!validName}
              >
                <FolderTree data-icon="inline-start" />
                {t.preview}
              </Button>
              <Button variant="outline" className="rounded-lg" onClick={reset}>
                <RotateCcw data-icon="inline-start" />
                {t.reset}
              </Button>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {t.hint}
              </p>
            </div>
          </div>
        </aside>
        <div className="min-w-0">
          <BuilderSectionNav
            label={t.sections}
            sections={[
              ...groups.map(({ field }) => ({
                id: `builder-${field}`,
                label: titleFor(field),
              })),
              { id: "builder-initGit", label: "Git" },
              {
                id: "builder-installDependencies",
                label: t.installDependencies,
              },
            ]}
          />
          <div className="flex flex-col gap-8 p-4 py-6 sm:p-6 lg:p-8">
            <section className="flex flex-col gap-3" aria-label={t.presets}>
              <h2 className="text-muted-foreground font-mono text-xs uppercase">
                {t.presets}
              </h2>
              <div className="flex flex-wrap gap-2">
                {manifest.presets.map((preset) => (
                  <Button
                    key={preset.id}
                    variant="outline"
                    aria-pressed={activePreset === preset.id}
                    className={cn(
                      "rounded-lg",
                      activePreset === preset.id &&
                        "border-primary/30 bg-primary/5 text-primary"
                    )}
                    size="sm"
                    onClick={() =>
                      setConfig(normalizePreviewConfig(preset.config))
                    }
                  >
                    {activePreset === preset.id && (
                      <Check aria-hidden="true" data-icon="inline-start" />
                    )}
                    {preset.label}
                  </Button>
                ))}
              </div>
            </section>
            {groups.map(
              ({ field, options: groupOptions, multiple, notice }) => {
                const value = config[field];
                const selection = Array.isArray(value)
                  ? value
                  : [String(value)];
                return (
                  <BuilderOptions
                    key={field}
                    id={`builder-${field}`}
                    title={titleFor(field)}
                    hint={multiple ? t.multiple : t.single}
                    options={groupOptions}
                    selected={selection.length > 0 ? selection : ["none"]}
                    multiple={multiple}
                    notice={notice}
                    onChange={(values) =>
                      setConfig((current) =>
                        updateBuilderConfig(current, field, values)
                      )
                    }
                  />
                );
              }
            )}
            <BuilderOptions
              id="builder-initGit"
              title={t.initGit}
              hint={t.single}
              options={[
                { description: t.initGit, label: "Git", value: "yes" },
                {
                  description: t.withoutGitDescription,
                  label: t.withoutGit,
                  value: "no",
                },
              ]}
              selected={[initGit]}
              onChange={(values) =>
                setInitGit(values[0] === "yes" ? "yes" : "no")
              }
            />
            <BuilderOptions
              id="builder-installDependencies"
              title={t.installDependencies}
              hint={t.single}
              options={installOptions}
              selected={[installDependencies]}
              onChange={(values) =>
                setInstallDependencies(values[0] === "yes" ? "yes" : "no")
              }
            />
          </div>
        </div>
      </div>
      {isExplorerOpen && (
        <ProjectExplorer
          state={state}
          onPresetSelect={setConfig}
          projectName={projectName}
          onClose={() => setIsExplorerOpen(false)}
        />
      )}
    </main>
  );
};
