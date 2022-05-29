import Link from 'next/link';
import { NextSeo } from 'next-seo';

import styles from '../styles/error-page.module.scss';

export default function NoVideo() {
    return (<>
        <NextSeo
            description='Aucune vidéo disponible'
        />
        <div className={styles['App']}>
            <div className={styles['title']}>
                <h1>Oups</h1>
                <h2>Aucune vidéo n'est disponible pour le moment.</h2>
            </div>
            <Link href={'/'}>
                <a>
                    ⟵ Revenir à la page d'accueil
                </a>
            </Link>
        </div>
    </>)
}