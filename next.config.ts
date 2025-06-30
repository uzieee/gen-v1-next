import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
    ],
  },
};

export default withPayload(nextConfig);
