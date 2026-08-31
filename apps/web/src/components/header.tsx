"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { ModeToggle } from "./mode-toggle";

const NAV_LINKS = [
  { href: "#home", id: "home", label: "Home" },
  { href: "#workflow", id: "workflow", label: "Workflow" },
  { href: "#features", id: "features", label: "Features" },
] as const;

const SECTION_IDS = NAV_LINKS.map(({ id }) => id);

const useActiveSection = () => {
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    const observers = SECTION_IDS.flatMap((id) => {
      const section = document.querySelector(`#${id}`);
      if (!section) return [];

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      observer.observe(section);
      return [observer];
    });

    return () => {
      for (const observer of observers) observer.disconnect();
    };
  }, []);

  return active;
};

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

export default function Header() {
  const activeSection = useActiveSection();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
          className="flex shrink-0 items-center gap-2 border-r border-border pr-5 transition-opacity hover:opacity-75"
          aria-label="Nest Arch home"
        >
          <Image
            src="/photos/logo.png"
            alt=""
            width={458}
            height={393}
            className="h-auto w-7"
          />
          <span className="font-mono text-sm font-semibold tracking-[-0.08em] text-foreground">
            nest<span className="text-red-600 dark:text-red-400">/</span>arch
          </span>
        </Link>
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ href, id, label }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={href}
                href={href}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${isActive ? "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-300" : "border-transparent text-foreground/60 hover:border-border hover:bg-muted/50 hover:text-foreground dark:text-muted-foreground"}`}
              >
                {label}
              </a>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="https://www.npmjs.com/package/@nest-arch/tui"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg border border-border px-2.5 py-1.5 font-mono text-[11px] text-foreground/60 transition-colors hover:border-red-500/40 hover:text-foreground dark:text-muted-foreground sm:block"
          >
            npm <span className="text-red-600 dark:text-red-400">v0.2.2</span>
          </Link>
          <Link
            href="https://github.com/Angel-Mario/nest-arch"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
          </Link>
          <ModeToggle />
          {/* <Link
            href="#get-started"
            className="hidden rounded-lg border border-red-500 bg-red-500 px-3 py-1.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-red-600 sm:block"
          >
            <span className="text-red-200">$</span> get started
          </Link> */}
        </div>
      </div>
    </header>
  );
}
