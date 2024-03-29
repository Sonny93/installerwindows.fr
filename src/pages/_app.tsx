import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Composants React
import ErrorBoundary from 'components/ErrorBoundary';
import NeedHelp from 'components/NeedHelp/NeedHelp';

// Fichiers CSS globaux
import 'styles/form.scss';
import 'styles/index.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

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
    <SessionProvider session={session}>
      <ErrorBoundary>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <DefaultSeo
          titleTemplate="Installerwindows.fr — %s"
          defaultTitle="Installerwindows.fr"
          description="Guides pour (ré)installer Windows 10/11 au propre et faire des optimisations saines pour votre machine. Il s'agit de guides complets, que vous devriez pouvoir suivre quel que soit votre niveau en informatique."
          openGraph={{
            type: 'website',
            locale: 'fr_FR',
            url: 'https://installerwindows.fr/',
            images: [
              {
                url: 'https://installerwindows.fr/icon-192x192.png',
              },
            ],
            site_name: 'Guides Windows',
          }}
        />
        <Component {...pageProps} />
        <NeedHelp />
        <Toaster position="top-center" toastOptions={{ style: { wordBreak: 'break-all' } }} />
      </ErrorBoundary>
    </SessionProvider>
  );
}

export default MyApp;
