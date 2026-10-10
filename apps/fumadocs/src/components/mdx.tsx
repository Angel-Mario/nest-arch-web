import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { ReviewedReleaseLink } from "./reviewed-release-link";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ReviewedReleaseLink,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
