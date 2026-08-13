"use client";

import { env } from "@nest-arch-web/env/web";
import { Toaster } from "@nest-arch-web/ui/components/sonner";
import { ConvexProvider, ConvexReactClient } from "convex/react";

import { ThemeProvider, useTheme } from "./theme-provider";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

const ThemedToaster = () => {
  const { resolvedTheme } = useTheme();

  return <Toaster richColors theme={resolvedTheme} />;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
      <ThemedToaster />
    </ThemeProvider>
  );
}
