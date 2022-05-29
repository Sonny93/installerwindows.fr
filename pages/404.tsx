import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/error-page.module.scss';

export default function Custom404() {
    return (<>
        <Head>
            <title>Installerwindows.fr — Page introuvable</title>
        </Head>
        <div className={styles['App']}>
            <div className={styles['title']}>
                <h1>404</h1>
                <h2>Cette page est introuvable.</h2>
            </div>
            <Link href={'/'}>
                <a>
                    ⟵ Revenir à la page d'accueil
                </a>
            </Link>
        </div>
    </>)
}