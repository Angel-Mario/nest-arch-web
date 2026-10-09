"use client";

import { Button } from "@nest-arch-web/ui/components/button";
import { Check, ChevronRight, Copy } from "lucide-react";
import { useState } from "react";

import { useUi } from "@/components/locale-provider";
import { builderMessages } from "@/lib/builder-messages";

export const ProjectCommand = ({
  command,
  disabled = false,
  variant = "default",
}: {
  command: string;
  disabled?: boolean;
  variant?: "default" | "terminal";
}) => {
  const { locale } = useUi();
  const t = builderMessages[locale];
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);
  const copied = copiedCommand === command;
  let status: string = t.commandDescription;
  if (copied) {
    status = t.copied;
  }
  if (copyError) {
    status = t.copyError;
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(command);
      setCopyError(false);
    } catch {
      setCopiedCommand(null);
      setCopyError(true);
    }
  };

  const commandContent = (
    <>
      <code className="block text-xs leading-relaxed break-words select-text">
        {command}
      </code>
      <output className="text-muted-foreground text-xs">{status}</output>
    </>
  );

  if (variant === "terminal") {
    return (
      <section
        className="relative shrink-0 rounded-lg border border-white/10 bg-white/[0.02] text-zinc-300"
        aria-label={t.command}
      >
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg py-2.5 pr-12 pl-3 text-xs hover:bg-white/5 [&::-webkit-details-marker]:hidden">
            <ChevronRight
              className="size-3.5 shrink-0 transition-transform group-open:rotate-90"
              aria-hidden="true"
            />
            <span>{t.command}</span>
          </summary>
          <div className="flex flex-col gap-2 border-t border-white/10 p-3">
            {commandContent}
          </div>
        </details>
        <button
          type="button"
          onClick={copy}
          disabled={disabled}
          aria-label={copied ? t.copied : t.copy}
          title={copied ? t.copied : t.copy}
          className="absolute top-1 right-1 flex size-8 items-center justify-center rounded-md text-zinc-400 hover:bg-white/10 hover:text-zinc-100 disabled:opacity-50"
        >
          {copied ? (
            <Check className="size-3.5 text-emerald-400" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
        <output className="sr-only">{copied || copyError ? status : ""}</output>
      </section>
    );
  }

  return (
    <section
      className="bg-background text-foreground flex flex-col gap-2 rounded-lg border p-3"
      aria-label={t.command}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">{t.command}</p>
        <Button
          className="rounded-lg"
          variant="outline"
          size="sm"
          onClick={copy}
          disabled={disabled}
        >
          {copied ? (
            <Check data-icon="inline-start" />
          ) : (
            <Copy data-icon="inline-start" />
          )}
          {copied ? t.copied : t.copy}
        </Button>
      </div>
      <details className="group">
        <summary className="text-muted-foreground hover:text-foreground focus-visible:outline-ring flex cursor-pointer list-none items-center gap-2 rounded-md py-1 text-xs focus-visible:outline-2 [&::-webkit-details-marker]:hidden">
          <ChevronRight
            className="size-3.5 transition-transform group-open:rotate-90"
            aria-hidden="true"
          />
          <code className="min-w-0 truncate">{command}</code>
        </summary>
        <div className="flex flex-col gap-2 pt-3">{commandContent}</div>
      </details>
      <output className="sr-only">{copied || copyError ? status : ""}</output>
    </section>
  );
};
