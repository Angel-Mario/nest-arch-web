"use client";

import { MessageSquare, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PRODUCT_LINKS = [
  { href: "/#features", label: "Features" },
  // { href: "/#templates", label: "Templates" },
  { href: "/#workflow", label: "Workflow" },
  { href: "/roadmap", label: "Roadmap" },
];

const RESOURCE_LINKS = [
  { href: "/#docs", label: "Documentation" },
  // { href: "/#guide", label: "Guide" },
  // { href: "/#examples", label: "Examples" },
  {
    href: "https://github.com/Angel-Mario/nest-arch/tags",
    label: "Changelog",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-12">
          <div className="flex flex-col gap-4 md:col-span-5">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="Nest Arch home"
            >
              <Image
                src="/photos/logo.png"
                alt=""
                width={458}
                height={393}
                className="h-auto w-7"
              />
              <span className="font-mono text-lg font-semibold tracking-[-0.04em] text-foreground">
                nest<span className="text-red-600 dark:text-red-400">/</span>
                arch
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              The modern CLI and TUI generator for building opinionated,
              production-ready NestJS applications and microservices.
            </p>
            <div className="mt-2 flex items-center gap-2.5">
              <Link
                href="https://www.npmjs.com/package/@nest-arch/tui"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 font-mono text-xs text-red-600 transition-colors hover:bg-red-500/20 dark:text-red-400"
                aria-label="npm package"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/npm-wordmark.svg"
                  alt="npm"
                  className="h-3 w-auto"
                />
                <span>@nest-arch/tui</span>
              </Link>
              <Link
                href="https://github.com/Angel-Mario/nest-arch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-red-500/50 hover:text-foreground"
                aria-label="GitHub"
              >
                <GithubIcon className="size-4" />
              </Link>
              {/* <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-red-500/50 hover:text-foreground"
                aria-label="Twitter"
              >
                <TwitterIcon className="size-4" />
              </Link>
              <Link
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-red-500/50 hover:text-foreground"
                aria-label="Discord"
              >
                <MessageSquare className="size-4" />
              </Link> */}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-red-400">
              Product
            </h4>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-red-400">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {RESOURCE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={href}
                    className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-red-400">
              Ready when you are
            </h4>
            <div className="rounded-xl border border-border bg-background p-4 font-mono text-xs leading-relaxed">
              <p className="text-muted-foreground">
                <span className="text-red-400">$</span> npx
                @nest-arch/tui@latest
              </p>
              <p className="mt-1 text-muted-foreground">
                <span className="text-red-400">&gt;</span> scaffold right, ship
                fast.
              </p>
              <p className="mt-0.5 text-muted-foreground/60">&gt; _</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 font-mono text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Nest Arch. MIT License.</p>
          <p className="flex items-center gap-1.5">
            Built with
            <Heart
              className="size-3 fill-red-500 text-red-500"
              aria-hidden="true"
            />
            for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
