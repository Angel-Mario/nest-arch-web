import { getLatestNpmVersion } from "@/lib/npm-version";
import { documentedVersion } from "@/lib/shared";

const labels = {
  en: {
    latest: "Latest version published on npm",
    unavailable: "npm is unavailable. Showing the documented version",
  },
  es: {
    latest: "Última versión publicada en npm",
    unavailable: "npm no está disponible. Se muestra la versión documentada",
  },
  pt: {
    latest: "Última versão publicada no npm",
    unavailable: "npm indisponível. Exibindo a versão documentada",
  },
} as const;

export async function NpmVersionBadge({ locale }: { locale: string }) {
  const version = await getLatestNpmVersion();
  const translation = labels[locale as keyof typeof labels] ?? labels.en;
  const label = version ? translation.latest : translation.unavailable;

  return (
    <span
      aria-label={`${label}: ${version ?? documentedVersion}`}
      className="nest-version-badge rounded-full border px-1.5 py-0.5 font-mono text-[0.625rem] font-normal"
      title={label}
    >
      {version ? "npm" : "docs"} v{version ?? documentedVersion}
    </span>
  );
}
