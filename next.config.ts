import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sledgebotcom.vercel.app",
      },
    ],
  },
};

export default nextConfig;
