import { normalizePreviewConfig } from "./project-preview/config";
import type { PreviewConfig } from "./project-preview/config";

const ARRAY_FIELDS = new Set<string>([
  "database",
  "orm",
  "api",
  "extras",
  "microservices",
  "addons",
  "ultraciteEditors",
  "ultraciteAgents",
  "ultraciteHooks",
]);

// Changing an earlier selection clears options whose prerequisites no longer hold.
export const updateBuilderConfig = (
  config: PreviewConfig,
  field: keyof PreviewConfig,
  values: string[]
): PreviewConfig => {
  const next = {
    ...config,
    [field]: ARRAY_FIELDS.has(field)
      ? values.filter((value) => value !== "none")
      : values[0],
  };
  if (next.database.length === 0) {
    next.orm = [];
    next.api = next.api.filter((value) => value !== "graphql");
    if (next.auth === "better-auth") {
      next.auth = "none";
    }
  }
  if (next.database.includes("mongodb")) {
    next.orm = next.orm.filter((orm) => orm === "prisma");
  }
  if (next.formatter === "none") {
    next.addons = next.addons.filter((value) => value !== "ultracite");
  }
  if (!next.extras.includes("swagger")) {
    next.addons = next.addons.filter((value) => value !== "scalar-ui");
  }
  if (next.architecture !== "nest-microservice") {
    next.microservices = [];
  }
  return normalizePreviewConfig(next);
};
