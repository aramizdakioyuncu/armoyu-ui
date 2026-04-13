import type { NextConfig } from "next";

const nextConfig: any = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  allowedDevOrigins: ['*']
};

export default nextConfig;
