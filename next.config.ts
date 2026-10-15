import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/timekeeper",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
