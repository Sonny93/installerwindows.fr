import BundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import NextPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache';

const withPWA = NextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
});

const withBundleAnalyzer = BundleAnalyzer({
  enabled: false, // process.env.NODE_ENV === "production"
});

const config: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      { hostname: 'i.ytimg.com' },
      { hostname: 'i.imgur.com' },
      { hostname: 'raw.githubusercontent.com' },
      { hostname: 'cdn.discordapp.com' },
      { hostname: 'github.com' },
    ],
    formats: ['image/webp'],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
};

export default withBundleAnalyzer(withPWA(config));
