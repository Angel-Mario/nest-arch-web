import type { Metadata } from "next";
import type * as React from "react";

import LayoutWrapper from "@/components/layout-wrapper";
import type { Locale } from "@/lib/i18n";
import { getUiMessages } from "@/lib/ui-messages";

const LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  pt: "pt_BR",
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getUiMessages(locale);
  const title = "Nest Arch — Scaffold Smarter. Ship Faster.";
  const description = t.metaDescription;

  return {
    description,
    openGraph: {
      description,
      locale: LOCALE_MAP[locale],
      siteName: "Nest Arch",
      title,
      type: "website",
      url: `https://nest-arch.vercel.app/${locale}`,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      title,
    },
  };
};

const LocaleLayout = ({ children }: { children: React.ReactNode }) => (
  <LayoutWrapper>{children}</LayoutWrapper>
);

export default LocaleLayout;
