import Link from 'next/link';
import styles from '../../styles/error-page.module.scss';

export default function Controls() {
    return (
        <div className={styles['controls']}>
            <Link href={'/'}>
                <a>
                    ⟵ Page d'accueil
                </a>
            </Link>
            <hr />
            <Link href={'/videos'}>
                <a>
                    Guide en version vidéo
                </a>
            </Link>
            <Link href={'/texte'}>
                <a>
                    Guide en version texte
                </a>
            </Link>
        </div>
    )
}