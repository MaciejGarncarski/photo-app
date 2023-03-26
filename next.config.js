/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }],
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'ik.imagekit.io'],
  },
};

/** @type {import('next-pwa').pwaConfig} */
const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
};

const withPWA = require('next-pwa')(pwaConfig);

module.exports = withBundleAnalyzer(withPWA(nextConfig));
