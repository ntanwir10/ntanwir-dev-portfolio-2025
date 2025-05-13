import { type NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default config;
