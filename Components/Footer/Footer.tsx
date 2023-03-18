import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import styles from './footer.module.scss';

export default function Footer() {
    const session = useSession();

    return (
        <footer className={styles['footer']}>
            <p>
                Réalisé avec ❤️ par{' '}
                <Link href={'https://sonny.dev/'} target="_blank" rel="noreferrer">
                    Sonny
                </Link>{' '}
                &{' '}
                <Link href={'https://github.com/Asthox'} target="_blank" rel="noreferrer">
                    Asthox
                </Link>
            </p>
            <ul className={styles['links']}>
                <li>
                    <Link href={'/videos'}>Vidéos</Link>
                </li>
                <li>
                    <Link href={'/guides'}>Guides</Link>
                </li>
                <li>
                    <Link href={'/cgu'}>CGU</Link>
                </li>
                {session.data ? (
                    <>
                        <li>{session.data?.user?.name}</li>
                        <li
                            onClick={() => signOut()}
                            style={{ color: 'salmon', cursor: 'pointer' }}
                        >
                            Déconnexion
                        </li>
                    </>
                ) : (
                    <li>
                        <Link href={'/signin'}>Connexion</Link>
                    </li>
                )}
            </ul>
        </footer>
    );
}
