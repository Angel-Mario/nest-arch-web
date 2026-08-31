import "@nest-arch-web/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "127.0.0.1",
  ],
};

export default nextConfig;
