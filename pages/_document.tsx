import { Head, Html, Main, NextScript } from 'next/document';

const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const SCRIPT_ORIGIN = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_ORIGIN;
export default function Document() {
    return (
        <Html lang="fr">
            <Head>
                <meta name="theme-color" content="#222831" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/images/icon-192x192.png" />
                <link rel="icon" href="/images/icon-192x192.png" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
                />
                {WEBSITE_ID && (
                    <script
                        async
                        defer
                        data-website-id={WEBSITE_ID}
                        src={`${SCRIPT_ORIGIN}/umami.js`}
                    />
                )}
            </Head>
            <body>
                <noscript>JavaScript recommandé pour une navigation optimale</noscript>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
