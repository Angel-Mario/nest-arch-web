import type { ReactNode } from "react";

import { documentedVersion, gitConfig } from "@/lib/shared";

export function ReviewedReleaseLink({
  children,
  kind,
}: {
  children: ReactNode;
  kind: "source" | "validation";
}) {
  const tag = encodeURIComponent(`@nest-arch/tui@${documentedVersion}`);
  const path =
    kind === "validation" ? `blob/${tag}/scripts/README.md` : `tree/${tag}`;

  return (
    <a href={`https://github.com/${gitConfig.user}/${gitConfig.repo}/${path}`}>
      {children}
    </a>
  );
}
