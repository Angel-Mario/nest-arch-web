"use client";

import { env } from "@nest-arch-web/env/web";
import { Toaster } from "@nest-arch-web/ui/components/sonner";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useTheme } from "next-themes";

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

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexProvider client={convex}>{children}</ConvexProvider>
      <ThemedToaster />
    </ThemeProvider>
  );
}
