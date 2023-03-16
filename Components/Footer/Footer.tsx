import { useSession } from 'next-auth/react';
import Link from 'next/link';

import styles from './footer.module.scss';

export default function Footer() {
    const session = useSession();
    console.log(session);

    return (
        <footer className={styles['footer']}>
            <p>
                Réalisé avec ❤️ par <Link href={'https://sonny.dev/'}>Sonny</Link> &{' '}
                <Link href={'https://github.com/Asthox'}>Asthox</Link>
            </p>
            <ul className={styles['links']}>
                <li>
                    <Link href={'/guides'}>Guides</Link>
                </li>
                <li>
                    <Link href={'/cgu'}>CGU</Link>
                </li>
                {session.data ? (
                    <li>{session.data?.user?.name}</li>
                ) : (
                    <li>
                        <Link href={'/signin'}>Connexion</Link>
                    </li>
                )}
            </ul>
        </footer>
    );
}
