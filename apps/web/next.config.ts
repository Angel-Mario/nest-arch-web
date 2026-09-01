import "@nest-arch-web/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "127.0.0.1",
  ],
  reactCompiler: true,
  typedRoutes: true,
};

export default nextConfig;
