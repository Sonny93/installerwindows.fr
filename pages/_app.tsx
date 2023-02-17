import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { hotjar } from 'react-hotjar';

import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Composants React
import ErrorBoundary from '../Components/ErrorBoundary';
import NeedHelp from '../Components/NeedHelp/NeedHelp';

// Fichiers CSS globaux
import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        const hjid = parseInt(process.env.NEXT_PUBLIC_HOTJAR_HJID || '', 10);
        const hjsv = parseInt(process.env.NEXT_PUBLIC_HOTJAR_HJSV || '', 10);
        if (!hjid || !hjsv) {
            return console.warn('Missing hjid or hjsv');
        }

        hotjar.initialize(hjid, hjsv);
    }, []);

    useEffect(() => {
        // Chargement pages
        router.events.on('routeChangeStart', nProgress.start);
        router.events.on('routeChangeComplete', nProgress.done);
        router.events.on('routeChangeError', nProgress.done);

        return () => {
            router.events.off('routeChangeStart', nProgress.start);
            router.events.off('routeChangeComplete', nProgress.done);
            router.events.off('routeChangeError', nProgress.done);
        };
    });

    return (
        <ErrorBoundary>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <DefaultSeo
                titleTemplate="Installerwindows.fr — %s"
                defaultTitle="Installerwindows.fr"
                description="Un guide d'installation et d'optimisation complet et sans risques"
                openGraph={{
                    type: 'website',
                    locale: 'fr_FR',
                    url: 'https://installerwindows.fr/',
                    images: [
                        {
                            url: 'https://installerwindows.fr/icon-192x192.png',
                        },
                    ],
                    site_name: 'Guide Windows',
                }}
            />
            <Component {...pageProps} />
            <NeedHelp />
        </ErrorBoundary>
    );
}

export default MyApp;
