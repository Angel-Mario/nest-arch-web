import { documentedVersion } from "@/lib/shared";

const labels = {
  en: "Documentation reviewed for version",
  es: "Documentación revisada para la versión",
  pt: "Documentação revisada para a versão",
} as const;

export function ReviewedVersionNote({ locale }: { locale: string }) {
  const label = labels[locale as keyof typeof labels] ?? labels.en;

  return (
    <p className="text-fd-muted-foreground text-xs">
      {label} <code>{documentedVersion}</code>
    </p>
  );
}
