"use client";

import { Button } from "@nest-arch-web/ui/components/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { useUi } from "@/components/locale-provider";
import { builderMessages } from "@/lib/builder-messages";

export const ProjectCommand = ({
  command,
  disabled = false,
}: {
  command: string;
  disabled?: boolean;
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

  return (
    <section
      className="bg-background text-foreground flex flex-col gap-2 rounded-lg border p-3"
      aria-label={t.command}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">{t.command}</p>
        <Button variant="outline" size="sm" onClick={copy} disabled={disabled}>
          {copied ? (
            <Check data-icon="inline-start" />
          ) : (
            <Copy data-icon="inline-start" />
          )}
          {copied ? t.copied : t.copy}
        </Button>
      </div>
      <code className="block text-xs leading-relaxed break-words select-text">
        {command}
      </code>
      <output className="text-muted-foreground text-xs">{status}</output>
    </section>
  );
};
