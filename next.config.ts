import type { NextConfig } from "next";

const nextConfig: any = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ['192.168.1.13', '192.168.1.11', 'localhost', '127.0.0.1']
};

export default nextConfig;
