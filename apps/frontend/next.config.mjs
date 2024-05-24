import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import withBundleAnalyzerConfig from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerConfig({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
export default withBundleAnalyzer({
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  experimental: {
    reactCompiler: {
      compilationMode: "annotation",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
});
