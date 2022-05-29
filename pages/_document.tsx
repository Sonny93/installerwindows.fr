import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='fr'>
			<Head>
				<link
					href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=optional'
					rel='stylesheet'
				/>
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