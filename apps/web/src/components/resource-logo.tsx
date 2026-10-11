import Image from "next/image";

import { TechnologyIcon } from "@/components/technology-icon";

export const ResourceLogo = ({ icon }: { icon: string }) => {
  if (icon.startsWith("/")) {
    return (
      <Image
        src={icon}
        width={24}
        height={24}
        alt=""
        className="size-6 shrink-0 object-contain"
      />
    );
  }
  return <TechnologyIcon value={icon} className="size-6" />;
};

export const GithubLogo = ({ className }: { className?: string }) => (
  <span
    className={`technology-icon inline-flex shrink-0 ${className ?? "size-3.5"}`}
    aria-hidden="true"
  >
    <Image
      src="/icons/github_light.svg"
      width={16}
      height={16}
      alt=""
      className="technology-icon-light size-full object-contain"
    />
    <Image
      src="/icons/github_dark.svg"
      width={16}
      height={16}
      alt=""
      className="technology-icon-dark size-full object-contain"
    />
  </span>
);
