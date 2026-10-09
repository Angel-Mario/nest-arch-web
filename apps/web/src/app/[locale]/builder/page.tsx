import type { Metadata } from "next";

import { builderMessages } from "@/lib/builder-messages";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

import { BuilderContent } from "./builder-content";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = builderMessages[locale];
  return { description: t.description, title: `${t.nav} — Nest Arch` };
};

const BuilderPage = () => <BuilderContent />;

export default BuilderPage;
