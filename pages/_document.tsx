import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="fr">
            <Head>
                <meta name="theme-color" content="#222831" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon-192x192.png" />
                <link rel="icon" href="/icon-192x192.png" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" />
            </Head>
            <body>
                <noscript>
                    Vous devez activer JavaScript pour utiliser ce site
                </noscript>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
