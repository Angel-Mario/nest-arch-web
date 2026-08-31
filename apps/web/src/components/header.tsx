"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { ModeToggle } from "./mode-toggle";

const NAV_LINKS = [
  { href: "#home", id: "home", label: "Home" },
  { href: "#cli", id: "cli", label: "Workflow" },
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
            nest<span className="text-red-400">/</span>arch
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
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${isActive ? "border-red-500/40 bg-red-500/10 text-red-300" : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground"}`}
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
            className="hidden rounded-lg border border-border px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-red-500/40 hover:text-foreground sm:block"
          >
            npm <span className="text-red-400">v0.2.2</span>
          </Link>
          <ModeToggle />
          <Link
            href="#get-started"
            className="hidden rounded-lg border border-red-500 bg-red-500 px-3 py-1.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-red-600 sm:block"
          >
            <span className="text-red-200">$</span> get started
          </Link>
        </div>
      </div>
    </header>
  );
}
