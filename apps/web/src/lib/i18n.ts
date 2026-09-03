export const locales = ["en", "es", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
};

/** Short codes for compact UI (e.g. header language control). */
export const localeCodes: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  pt: "PT",
};

export const getLocaleLabel = (locale: string) =>
  localeLabels[locale as Locale] ?? locale;
