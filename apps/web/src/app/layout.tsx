import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type * as React from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";

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
    "Powerful CLI and interactive TUI generator for building opinionated, production-ready NestJS applications and microservices.",
  title: "Nest Arch — Scaffold Smarter. Ship Faster.",
};
const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Analytics />
      <Providers>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
