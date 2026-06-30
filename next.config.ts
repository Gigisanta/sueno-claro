import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  typedRoutes: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
