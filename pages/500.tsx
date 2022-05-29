import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/error-page.module.scss';

export default function Custom500() {
    return (<>
        <Head>
            <title>Installerwindows.fr — Une erreur côté serveur est survenue</title>
        </Head>
        <div className={styles['App']}>
            <div className={styles['title']}>
                <h1>500</h1>
                <h2>Une erreur côté serveur est survenue.</h2>
            </div>
            <Link href={'/'}>
                <a>⟵ Revenir à la page d'accueil</a>
            </Link>
        </div>
    </>)
}