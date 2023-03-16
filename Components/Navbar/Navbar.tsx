import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { useEffect, useState } from 'react';

import styles from './Navbar.module.scss';

export default function Navbar({ shadowEnable = true }: { shadowEnable?: boolean }) {
    const [showShadow, setShowShadow] = useState<boolean>(false);

    const handleScroll = () => setShowShadow(window.scrollY !== 0);
    useEffect(() => {
        if (!shadowEnable) {
            return window.removeEventListener('scroll', handleScroll);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [shadowEnable]);

    return (
        <>
            <nav className={styles['navbar'] + (showShadow ? ` ${styles['shadow']}` : '')}>
                <div className={styles['brand']}>
                    <Link href={'/'}>Installerwindows.fr</Link>
                </div>
                <ul className={styles['links']}>
                    <li>
                        <Link href={'/'} style={{ fontSize: '1.25em' }}>
                            <AiOutlineHome />
                        </Link>
                    </li>
                    <li>
                        <Link href={'/videos'}>Vidéos</Link>
                    </li>
                    <li>
                        <Link href={'/guides'}>Guides</Link>
                    </li>
                    <li>
                        <Link
                            href={'https://www.youtube.com/c/Piwi_youtube'}
                            target="_blank"
                            rel="noreferrer"
                        >
                            @Piwi
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
