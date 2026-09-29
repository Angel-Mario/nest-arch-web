import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const convexUrlSchema = (exampleHost: string) =>
  z.url().refine((url) => new URL(url).hostname !== exampleHost, {
    message: `Replace the ${exampleHost} placeholder before running the app`,
  });

export const env = createEnv({
  client: {
    NEXT_PUBLIC_CONVEX_URL: convexUrlSchema("example.convex.cloud"),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z
      .string()
      .regex(/^G-[A-Z0-9]+$/u)
      .optional(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
  server: {
    GOOGLE_SITE_VERIFICATION: z.string().min(1).optional(),
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
