import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import type * as React from "react";

import LayoutWrapper from "@/components/layout-wrapper";
import type { Locale } from "@/lib/i18n";
import { getUiMessages } from "@/lib/ui-messages";

import "../../index.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  pt: "pt_BR",
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> => {
  const { locale } = await params;
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

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;

  return (
    <html
      lang={locale}
      className={theme === "dark" || theme === "light" ? theme : undefined}
      suppressHydrationWarning
    >
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
