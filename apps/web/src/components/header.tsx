// oxlint-disable react/set-state-in-effect
"use client";

import { api } from "@nest-arch-web/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { useUi } from "@/components/locale-provider";
import { LocaleSelect } from "@/components/locale-select";

import { ModeToggle } from "./mode-toggle";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const Header = () => {
  const { t, locale } = useUi();
  const pathname = usePathname();

  const NAV_LINKS = [
    { href: `/${locale}/#home`, id: "home", label: t.header.nav.home },
    {
      href: `/${locale}/#workflow`,
      id: "workflow",
      label: t.header.nav.workflow,
    },
    {
      href: `/${locale}/#features`,
      id: "features",
      label: t.header.nav.features,
    },
    { href: undefined, id: "undefined", label: "|" },
    {
      href: `/${locale}/roadmap`,
      id: "roadmap",
      label: t.header.nav.roadmap,
    },
    {
      href: "https://angelmario-portfolio.vercel.app",
      id: "about",
      label: t.header.nav.aboutMe,
    },
  ] as const;

  const SECTION_IDS = NAV_LINKS.map(({ id }) => id);

  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    if (pathname === `/${locale}/roadmap`) {
      setActive("roadmap");
      return;
    }

    if (pathname !== `/${locale}` && pathname !== "/") {
      setActive("");
      return;
    }

    const observers = SECTION_IDS.flatMap((id) => {
      const section = document.querySelector(`#${id}`);
      if (!section) {
        return [];
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActive(id);
          }
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      observer.observe(section);
      return [observer];
    });

    setActive((current) => current || "home");

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, [pathname, locale, SECTION_IDS]);

  const packageVersion = useQuery(api.crons.getLatestNpmPackageVersion, {});

  return (
    <header className="border-border bg-background/85 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}` as Route}
          onClick={() =>
            window.scrollTo({ behavior: "smooth", left: 0, top: 0 })
          }
          className="border-border flex shrink-0 items-center gap-2 border-r pr-5 transition-opacity hover:opacity-75"
          aria-label={t.header.nestArchHome}
        >
          <Image
            src="/photos/logo.png"
            alt=""
            width={458}
            height={393}
            className="h-auto w-7"
          />
          <span className="text-foreground font-mono text-sm font-semibold tracking-[-0.08em]">
            nest<span className="text-red-600 dark:text-red-400">/</span>arch
          </span>
        </Link>
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ href, id, label }, index) => {
            const isActive = active === id;

            return id === "undefined" ? (
              <span
                key={`href-${index}`}
                className="mb-1 text-red-500 opacity-80"
              >
                |
              </span>
            ) : (
              <Link
                key={href}
                href={href as Route}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${isActive ? "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-300" : "text-foreground/60 hover:border-border hover:bg-muted/50 hover:text-foreground dark:text-muted-foreground border-transparent"}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LocaleSelect />
          <Link
            href="https://www.npmjs.com/package/@nest-arch/tui"
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-foreground/60 hover:text-foreground dark:text-muted-foreground flex flex-row items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition-colors hover:border-red-500/40"
          >
            <Image
              src="/icons/npm-wordmark.svg"
              alt="npm"
              width={38}
              height={26}
              className="mt-0.5 h-4 w-auto grayscale"
            />
            <span className="">v{packageVersion?.version || "..."}</span>
          </Link>
          <Link
            href="https://github.com/Angel-Mario/nest-arch"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
