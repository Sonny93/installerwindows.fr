const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

console.log(process.env.NODE_ENV);
module.exports = withPWA({
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        runtimeCaching,
        disable: process.env.NODE_ENV === 'development'
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });

        return config;
    },
    images: {
        domains: ['i.ytimg.com', 'i.imgur.com'],
        formats: ['image/webp']
    },
    experimental: {
        images: {
            layoutRaw: true
        }
    },
    optimizeFonts: false
});