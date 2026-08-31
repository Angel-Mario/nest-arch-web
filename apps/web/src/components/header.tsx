"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

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

const NAV_LINKS = [
  { href: "#intro", id: "intro", label: "Intro" },
  { href: "#cli", id: "cli", label: "CLI" },
  { href: "#features", id: "features", label: "Features" },
  { href: "#architecture", id: "architecture", label: "Architecture" },
  { href: "#docs", id: "docs", label: "Docs" },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

const useActiveSection = () => {
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect =
      (id: string) => (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(id);
          }
        }
      };

    for (const id of SECTION_IDS) {
      const el = document.querySelector(`#${id}`);
      if (!el) {
        continue;
      }
      const obs = new IntersectionObserver(handleIntersect(id), {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      });
      obs.observe(el);
      observers.push(obs);
    }

    return () => {
      for (const obs of observers) {
        obs.disconnect();
      }
    };
  }, []);

  return active;
};

export default function Header() {
  const activeSection = useActiveSection();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/8 dark:border-white/8 bg-white/90 dark:bg-[#08090e]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8 h-14">
        {/* Brand — logo image + ascii name */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, left: 0 })}
          className="flex items-center gap-2.5 shrink-0 opacity-90 hover:opacity-100 transition-opacity"
          aria-label="Nest Arch home"
        >
          {/* Cat ASCII logo */}
          <Image
            src="/photos/logo.png"
            alt="Nest Arch"
            width={458}
            height={393}
            className="h-auto w-7"
          />
          {/* ASCII wordmark */}
          <Image
            src="/photos/nest.png"
            alt="Nest"
            width={421}
            height={110}
            className="-mb-0.5 h-auto w-22.5"
          />
          <Image
            src="/photos/arch.png"
            alt="Arch"
            width={421}
            height={110}
            className="-mb-0.5 -ml-2 h-auto w-22.5"
          />
        </Link>

        {/* Nav links — centered, flush like tRPC */}
        <nav
          className="hidden md:flex items-center gap-1 flex-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ href, id, label }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={href}
                href={href}
                className={[
                  "relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md",
                  isActive
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200",
                ].join(" ")}
              >
                {label}
                {isActive && (
                  <span className="absolute inset-x-2 -bottom-2.25 h-px bg-red-500" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right side — icons + version badge + theme toggle */}
        <div className="flex items-center gap-1 ml-auto">
          {/* npm version badge */}
          <Link
            href="https://www.npmjs.com/package/@nest-arch/tui"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <Image
              src="/icons/npm-wordmark.svg"
              alt="npm"
              width={128}
              height={128}
              className="h-3 w-auto opacity-60"
            />
            <span className="text-zinc-400 dark:text-zinc-500 select-none">
              v0.2.2
            </span>
          </Link>

          {/* Divider */}
          <span className="hidden sm:block w-px h-4 bg-black/10 dark:bg-white/10 mx-1" />

          {/* GitHub icon */}
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
          </Link>

          {/* Theme toggle */}
          <ModeToggle />

          {/* Divider */}
          <span className="hidden sm:block w-px h-4 bg-black/10 dark:bg-white/10 mx-1" />

          {/* Get Started CTA */}
          <Link
            href="#get-started"
            className="hidden sm:flex items-center gap-1.5 rounded-md bg-[--nest-red] hover:bg-[#A8302E] px-3 py-1.5 text-xs font-semibold text-white transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
