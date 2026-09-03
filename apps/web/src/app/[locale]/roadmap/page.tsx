import type { Metadata } from "next";

import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getUiMessages } from "@/lib/ui-messages";

import { RoadmapContent } from "./roadmap-content";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = getUiMessages(locale);

  return {
    description: t.metaDescription,
    title: "Roadmap — Nest Arch",
  };
};

const RoadmapPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  await params;

  return <RoadmapContent />;
};

export default RoadmapPage;
