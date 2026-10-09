import type { CreateProjectWizardState } from "@/app/_components/interactive-terminal-wizard";

type ProjectCommandState = Omit<
  CreateProjectWizardState,
  "ultraciteAgents" | "ultraciteEditors" | "ultraciteHooks"
> & {
  ultraciteAgents: string[];
  ultraciteEditors: string[];
  ultraciteHooks: string[];
};

// Keep the flags aligned with nest-arch.jsonc's reproducibleCommand.
export const buildProjectCommand = (state: ProjectCommandState): string => {
  const name = /^[a-z][a-z0-9-]{0,63}$/u.test(state.projectName)
    ? state.projectName
    : "my-nest-app";
  const parts = [
    `pnpm create nest-arch@latest ${name}`,
    `--package-manager ${state.packageManager ?? "pnpm"}`,
    `--http-provider ${state.httpProvider ?? "express"}`,
    `--project-type ${state.projectType ?? "single"}`,
    `--architecture ${state.architecture ?? "nest-api"}`,
  ];
  for (const field of [
    "database",
    "orm",
    "api",
    "extras",
    "microservices",
    "addons",
  ] as const) {
    parts.push(
      `--${field} ${state[field].length > 0 ? state[field].join(" ") : "none"}`
    );
  }
  parts.push(
    `--auth ${state.auth ?? "none"}`,
    `--formatter ${state.formatter ?? "none"}`,
    `--install-dependencies ${state.installDependencies ?? "no"}`,
    state.initGit === "yes" ? "--git" : "--no-git"
  );
  if (state.addons.includes("ultracite")) {
    for (const [flag, values] of [
      ["editors", state.ultraciteEditors],
      ["agents", state.ultraciteAgents],
      ["hooks", state.ultraciteHooks],
    ] as const) {
      if (values.length > 0) {
        parts.push(`--ultracite-${flag} ${values.join(" ")}`);
      }
    }
    parts.push(
      `--ultracite-install-skill ${state.ultraciteInstallSkill ?? "no"}`
    );
  }
  return parts.join(" ");
};
