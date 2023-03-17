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

const config = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    images: {
        domains: ['i.ytimg.com', 'i.imgur.com', 'raw.githubusercontent.com'],
        formats: ['image/webp'],
    },
    optimizeFonts: false,
};

module.exports = withBundleAnalyzer(withPWA(config));
