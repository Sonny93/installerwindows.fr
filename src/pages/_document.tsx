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
        {WEBSITE_ID && (
          <script async defer data-website-id={WEBSITE_ID} src={`${SCRIPT_ORIGIN}/script.js`} />
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
