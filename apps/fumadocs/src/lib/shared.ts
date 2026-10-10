import documentedRelease from "./documented-release.json";

export const appName = "Nest Arch";
export const documentedVersion = documentedRelease.version;
export const appDescription =
  "Crea una base clara para tu siguiente aplicación NestJS.";
export const appBasePath = "/docs";
export const docsRoute = "/";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: "Angel-Mario",
  repo: "nest-arch",
  branch: "main",
};
