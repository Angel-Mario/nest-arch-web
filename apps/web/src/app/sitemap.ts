import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";

const SITE_URL = "https://nest-arch.vercel.app";
const PAGE_PATHS = ["", "/builder", "/roadmap", "/privacy"] as const;

const sitemap = (): MetadataRoute.Sitemap =>
  PAGE_PATHS.flatMap((path) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
    );

    return locales.map((locale) => ({
      alternates: { languages },
      url: `${SITE_URL}/${locale}${path}`,
    }));
  });

export default sitemap;
