"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo } from "react";

import { defaultLocale, locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getUiMessages } from "@/lib/ui-messages";
import type { UiMessages } from "@/lib/ui-messages";

interface LocaleContextValue {
  locale: Locale;
  t: UiMessages;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const resolveLocaleFromPath = (pathname: string): Locale => {
  const segment = pathname
    .split("/")
    .filter(Boolean)
    .find((s) => locales.includes(s as Locale));
  if (segment && locales.includes(segment as Locale)) {
    return segment as Locale;
  }
  return defaultLocale;
};

const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() ?? "/";

  const value = useMemo(() => {
    const locale = resolveLocaleFromPath(pathname);
    return {
      locale,
      t: getUiMessages(locale),
    };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = value.locale;
  }, [value.locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

const useUi = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useUi must be used within LocaleProvider");
  }
  return ctx;
};

export { LocaleProvider, useUi };
