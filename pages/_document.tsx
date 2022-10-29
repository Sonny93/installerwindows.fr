import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="fr">
			<Head>
				<meta name="theme-color" content="#222831" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/icon-192x192.png" />
				<link rel="icon" href="/icon-192x192.png" />
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
