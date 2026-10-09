import { i18nProvider } from "fumadocs-ui/i18n";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import nestArchLogo from "@/components/nest-arch-logo.png";
import { NpmVersionBadge } from "@/components/npm-version-badge";
import { i18n } from "@/lib/i18n";
import { baseOptions, translations } from "@/lib/layout.shared";
import { appDescription, appName } from "@/lib/shared";
import { source } from "@/lib/source";

import "../global.css";

const deploymentHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;

export const metadata: Metadata = {
  applicationName: appName,
  description: appDescription,
  icons: { icon: nestArchLogo.src },
  metadataBase: deploymentHost
    ? new URL(
        deploymentHost.startsWith("http")
          ? deploymentHost
          : `https://${deploymentHost}`
      )
    : undefined,
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
};

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!i18n.languages.includes(lang as (typeof i18n.languages)[number])) {
    notFound();
  }
  const options = baseOptions(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="nest-docs flex min-h-screen flex-col">
        <RootProvider
          i18n={i18nProvider(translations, lang)}
          search={{ options: { api: `/docs/${lang}/api/search` } }}
        >
          <DocsLayout
            tree={source.getPageTree(lang)}
            {...options}
            nav={{
              ...options.nav,
              title: (
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Image
                    alt=""
                    className="shrink-0"
                    height={26}
                    src={nestArchLogo}
                    width={26}
                    unoptimized
                  />
                  <span className="font-semibold tracking-tight">
                    {appName}
                  </span>
                  <NpmVersionBadge locale={lang} />
                </span>
              ),
            }}
          >
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
