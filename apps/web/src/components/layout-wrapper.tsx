"use client";

import type * as React from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { LocaleProvider } from "@/components/locale-provider";
import Providers from "@/components/providers";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <Providers>
    <LocaleProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </LocaleProvider>
  </Providers>
);

export default LayoutWrapper;
