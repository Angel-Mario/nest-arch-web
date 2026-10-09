import type { Locale } from "@/lib/i18n";

const documentationPaths = {
  en: "/docs",
  es: "/docs/es",
  pt: "/docs/pt",
} as const;

export const getDocumentationUrl = (locale: Locale) =>
  documentationPaths[locale];
