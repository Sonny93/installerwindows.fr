import { useEffect } from 'react';
import { useRouter } from 'next/router';

import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Composants React
import ErrorBoundary from '../components/ErrorBoundary';
import NeedHelp from '../Components/NeedHelp/NeedHelp';

// Fichiers CSS globaux
import '../styles/index.scss';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    useEffect(() => { // Chargement pages
        router.events.on('routeChangeStart', nProgress.start);
        router.events.on('routeChangeComplete', nProgress.done);
        router.events.on('routeChangeError', nProgress.done);

        return () => {
            router.events.off('routeChangeStart', nProgress.start);
            router.events.off('routeChangeComplete', nProgress.done);
            router.events.off('routeChangeError', nProgress.done);
        }
    });
    return (
        <ErrorBoundary>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <link rel='icon' href='/img/piwi.png' />
                <title>Installerwindows.fr</title>
            </Head>
            <Component {...pageProps} />
            <NeedHelp />
        </ErrorBoundary>
    );
}

export default MyApp;