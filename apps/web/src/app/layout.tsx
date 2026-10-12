import { env } from "@nest-arch-web/env/web";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
import type * as React from "react";

import Providers from "@/components/providers";
import { defaultLocale } from "@/lib/i18n";

import "../index.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description:
    "Configure a NestJS project with Nest Arch, an interactive CLI and terminal UI for choosing your runtime, database, API, authentication, and developer tools before generating your application.",
  metadataBase: new URL("https://nest-arch.vercel.app"),
  openGraph: {
    description:
      "Configure a NestJS project with Nest Arch, an interactive CLI and terminal UI for choosing your runtime, database, API, authentication, and developer tools before generating your application.",
    images: [
      {
        alt: "Nest Arch logo",
        height: 600,
        url: "/photos/logo.png",
        width: 600,
      },
    ],
    siteName: "Nest Arch",
    title: "Nest Arch — Scaffold Smarter. Ship Faster.",
    type: "website",
  },
  title: "Nest Arch — Scaffold Smarter. Ship Faster.",
  twitter: {
    card: "summary_large_image",
    images: ["/photos/logo.png"],
  },
  verification: {
    google: env.GOOGLE_SITE_VERIFICATION,
  },
};

const RootLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [cookieStore, requestHeaders] = await Promise.all([
    cookies(),
    headers(),
  ]);
  const theme = cookieStore.get("theme")?.value;
  const locale = requestHeaders.get("x-nest-arch-locale") ?? defaultLocale;

  return (
    <html
      lang={locale}
      className={theme === "dark" || theme === "light" ? theme : undefined}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
