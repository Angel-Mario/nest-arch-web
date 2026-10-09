import "@nest-arch-web/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "127.0.0.1",
  ],
  headers() {
    return Promise.resolve([
      {
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
        source: "/project-previews/:path*",
      },
    ]);
  },
  outputFileTracingIncludes: {
    "/api/project-preview": ["./private/nest-arch/**/*"],
  },
  reactCompiler: true,
  serverExternalPackages: ["handlebars", "ts-morph"],
  typedRoutes: true,
};

export default nextConfig;
