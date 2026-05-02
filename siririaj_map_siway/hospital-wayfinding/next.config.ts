import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const repo = "SIRIRAJ_MAP_SIWAY";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repo}` : "",
  },
};

export default nextConfig;
