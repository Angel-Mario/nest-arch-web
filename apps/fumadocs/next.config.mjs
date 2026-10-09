import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  basePath: "/docs",
  // Serve static sources directly while the Services image optimizer returns 404.
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  async redirects() {
    // Vercel routes the public root to web; this shortcut is for local development.
    if (process.env.NODE_ENV !== "development") {
      return [];
    }

    return [
      {
        source: "/",
        destination: "/docs",
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
