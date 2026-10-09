import { docs } from "collections/server";
import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";

import { i18n } from "./i18n";
import {
  appBasePath,
  docsContentRoute,
  docsImageRoute,
  docsRoute,
} from "./shared";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  i18n,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImageUrl(page: (typeof source)["$inferPage"]) {
  const segments = [...page.slugs, "image.png"];
  const localePrefix = page.locale === i18n.defaultLanguage ? "" : page.locale;

  return {
    segments,
    url:
      `${appBasePath}/` +
      [localePrefix, ...docsImageRoute.split("/"), ...segments]
        .filter(Boolean)
        .join("/"),
  };
}

export function getPageMarkdownUrl(page: (typeof source)["$inferPage"]) {
  const segments = [...page.slugs, "content.md"];
  const localePrefix = page.locale === i18n.defaultLanguage ? "" : page.locale;

  return {
    segments,
    url:
      `${appBasePath}/` +
      [localePrefix, ...docsContentRoute.split("/"), ...segments]
        .filter(Boolean)
        .join("/"),
  };
}

export async function getLLMText(page: (typeof source)["$inferPage"]) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${appBasePath}${page.url})

${processed}`;
}
