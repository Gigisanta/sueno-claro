import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: { globalNotFound: true },
  typedRoutes: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
