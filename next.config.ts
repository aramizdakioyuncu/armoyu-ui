import type { NextConfig } from "next";

const nextConfig: any = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ['*']
};

export default nextConfig;
