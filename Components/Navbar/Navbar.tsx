import Link from 'next/link';
import styles from './Navbar.module.scss';

export default function Navbar() {
    return (
        <>
            <nav className={styles['navbar']}>
                <div className={styles['brand']}>
                    <Link href={'/'}>
                        <a>Installerwindows.fr</a>
                    </Link>
                </div>
                <ul className={styles['links']}>
                    <li>
                        <Link href={'/videos'}>
                            <a>Vidéos</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/texte'}>
                            <a>Guide Textuel</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'https://www.youtube.com/c/Piwi_youtube'}>
                            <a target='_blank' rel='noreferrer'>@Piwi</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}