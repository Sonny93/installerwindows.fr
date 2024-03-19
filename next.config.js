const BundleAnalyzer = require('@next/bundle-analyzer');
const NextPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

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

/** @type {import('next').NextConfig} */
const config = {
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
  optimizeFonts: false,
};

module.exports = withBundleAnalyzer(withPWA(config));
