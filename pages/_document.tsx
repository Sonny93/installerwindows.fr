import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='fr'>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap' rel='stylesheet' />
			</Head>
			<body>
				<noscript>
					Vous devez activer JavaScript pour utiliser ce site
				</noscript>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}