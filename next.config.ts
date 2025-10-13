import { withContentlayer } from "next-contentlayer";
import createNextPWA from "next-pwa";
import type { NextConfig } from "next";

const withPWA = createNextPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  dynamicStartUrl: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  eslint: {
    dirs: ["app", "components", "lib", "content"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
    ],
  },
  poweredByHeader: false,
};

export default withContentlayer(withPWA(nextConfig));
