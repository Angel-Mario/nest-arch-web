"use client";

import { env } from "@nest-arch-web/env/web";
import { Toaster } from "@nest-arch-web/ui/components/sonner";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useTheme } from "next-themes";
import type * as React from "react";

import { ThemeProvider } from "./theme-provider";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

const ThemedToaster = () => {
  const { resolvedTheme } = useTheme();
  const theme =
    resolvedTheme === "dark" ||
    resolvedTheme === "light" ||
    resolvedTheme === "system"
      ? resolvedTheme
      : "system";

  return <Toaster richColors theme={theme} />;
};

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    disableTransitionOnChange
  >
    <ConvexProvider client={convex}>{children}</ConvexProvider>
    <ThemedToaster />
  </ThemeProvider>
);

export default Providers;
