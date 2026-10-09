import {
  Activity,
  Bot,
  CircleOff,
  Code,
  Dog,
  GitBranch,
  ListTodo,
  Monitor,
  Network,
  Package,
  Shield,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import { technologies } from "@/lib/technologies";

const featureIcons = {
  "agent-skills": Bot,
  grpc: Network,
  "health-check": Activity,
  husky: Dog,
  no: CircleOff,
  none: CircleOff,
  "rate-limiting": Shield,
  rest: Code,
  "todo-example": ListTodo,
  ultracite: Sparkles,
  universal: Monitor,
  yes: Package,
};

export const TechnologyIcon = ({
  value,
  section,
  className = "size-5",
}: {
  value: string;
  section?: string;
  className?: string;
}) => {
  if (value === "eslint-prettier-no-stylelint") {
    return (
      <span
        className="inline-flex shrink-0 items-center gap-1"
        aria-hidden="true"
      >
        <Image
          src="/icons/technologies/eslint.svg"
          width={20}
          height={20}
          alt=""
          className={className}
        />
        <Image
          src="/icons/technologies/prettier.svg"
          width={20}
          height={20}
          alt=""
          className={className}
        />
      </span>
    );
  }
  const technology = technologies[value];
  if (technology) {
    return (
      <span
        className={`technology-icon inline-flex shrink-0 ${className}`}
        aria-hidden="true"
      >
        <Image
          src={technology.icon}
          width={24}
          height={24}
          alt=""
          className={
            technology.darkIcon
              ? "technology-icon-light size-full object-contain"
              : "size-full object-contain"
          }
        />
        {technology.darkIcon && (
          <Image
            src={technology.darkIcon}
            width={24}
            height={24}
            alt=""
            className="technology-icon-dark size-full object-contain"
          />
        )}
      </span>
    );
  }
  if (value === "yes" && section === "builder-initGit") {
    return <GitBranch className={className} aria-hidden="true" />;
  }
  const Icon = featureIcons[value as keyof typeof featureIcons] ?? Bot;
  return <Icon className={className} aria-hidden="true" />;
};
