"use client";

import * as React from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const THEME_STORAGE_KEY = "theme";
const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const getPreferredTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resolvedTheme, setResolvedTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : getPreferredTheme();

    applyTheme(initialTheme);

    const animationFrame = window.requestAnimationFrame(() => {
      setResolvedTheme(initialTheme);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const setTheme = React.useCallback((theme: Theme) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    setResolvedTheme(theme);
    applyTheme(theme);
  }, []);

  const value = React.useMemo(
    () => ({ resolvedTheme, setTheme }),
    [resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.");
  }

  return context;
};
