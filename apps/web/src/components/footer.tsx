"use client";

import { MessageSquare, Heart } from "lucide-react";
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

export default function Footer() {
  return (
    <footer className="border-t border-black/8 dark:border-white/10 bg-zinc-50 dark:bg-[#06070b] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 font-mono font-bold text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                NA
              </div>
              <span className="font-mono font-bold text-lg text-white">
                Nest Arch
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm font-mono">
              The modern CLI and TUI generator for building opinionated,
              production-ready NestJS applications and microservices.
            </p>
            <div className="flex items-center gap-3 text-zinc-400 mt-2">
              <Link
                href="https://www.npmjs.com/package/@nest-arch/tui"
                target="_blank"
                className="flex h-8 px-2.5 items-center justify-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 text-xs font-mono transition-colors"
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
                href="https://github.com"
                target="_blank"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-4 w-4" />
              </Link>
              <Link
                href="https://discord.com"
                target="_blank"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Discord"
              >
                <MessageSquare className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Links Cols */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-xs font-semibold text-rose-400 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-zinc-400">
              <li>
                <Link
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#templates"
                  className="hover:text-white transition-colors"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="#cli"
                  className="hover:text-white transition-colors"
                >
                  CLI
                </Link>
              </li>
              <li>
                <Link
                  href="#roadmap"
                  className="hover:text-white transition-colors"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-xs font-semibold text-rose-400 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-zinc-400">
              <li>
                <Link
                  href="#docs"
                  className="hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#guide"
                  className="hover:text-white transition-colors"
                >
                  Guide
                </Link>
              </li>
              <li>
                <Link
                  href="#examples"
                  className="hover:text-white transition-colors"
                >
                  Examples
                </Link>
              </li>
              <li>
                <Link
                  href="#changelog"
                  className="hover:text-white transition-colors"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="rounded-lg border border-white/10 bg-[#0b0c12] p-3 font-mono text-xs text-zinc-400 space-y-1">
              <p className="text-emerald-400">&gt; build with nest-arch</p>
              <p className="text-rose-400">&gt; ship with confidence</p>
              <p className="text-rose-400">&gt; scale without limits</p>
              <p className="text-zinc-600">&gt; _</p>
            </div>
          </div>
        </div>

        <div className="border-t border-black/8 dark:border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400 dark:text-zinc-500">
          <p>© 2026 Nest Arch. MIT License.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />{" "}
            for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
