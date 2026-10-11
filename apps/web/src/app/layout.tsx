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
    "CLI and interactive TUI for configuring NestJS applications and microservices. Version 1.0.0.",
  title: "Nest Arch — Scaffold Smarter. Ship Faster.",
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
