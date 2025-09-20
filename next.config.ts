import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "24mb",
    },
  },
  images: {
    domains: ["localhost", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Optimize for Vercel deployment
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  // Temporarily disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPayload(nextConfig);
