import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import ExternalLink from '../ExternalLink';

import packageJson from '../../package.json';

import { FaDiscord, FaGithub } from 'react-icons/fa';
import styles from './footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles['footer']}>
            <Informations />
            <FollowProject />
            <SiteLinks />
        </footer>
    );
}

function Informations() {
    return (
        <ul>
            <li>
                <h3>Installerwindows.fr</h3>
                <p>v{packageJson.version}</p> {/* à afficher en petit sous le h3 */}
            </li>
            <li>
                <p>
                    Guides pour (ré)installer Windows 10/11 au propre et faire des optimisations
                    saines pour votre machine. Il s'agit de guides complets, que vous devriez
                    pouvoir suivre quel que soit votre niveau en informatique.
                </p>
            </li>
            <li>
                <p>
                    Contenu par{' '}
                    <ExternalLink href={'https://www.youtube.com/c/Piwi_youtube'}>
                        @Piwi
                    </ExternalLink>
                </p>
                <p>
                    Site réalisé par{' '}
                    <ExternalLink href={'https://www.sonny.dev/'}>@Sonny</ExternalLink>
                </p>
                <p>
                    API réalisée par{' '}
                    <ExternalLink href={'https://github.com/Asthox'}>@Asthox</ExternalLink>
                </p>
            </li>
        </ul>
    );
}

function FollowProject() {
    return (
        <ul>
            <li>
                <h4>Suivre le projet</h4>
            </li>
            <li>
                <FaDiscord />
            </li>
            <li>
                <FaGithub />
            </li>
        </ul>
    );
}

function SiteLinks() {
    const session = useSession();

    return (
        <ul className={styles['links']}>
            <li>
                <h4>Naviguation</h4>
            </li>
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
                    <li onClick={() => signOut()} style={{ color: 'salmon', cursor: 'pointer' }}>
                        Déconnexion
                    </li>
                </>
            ) : (
                <li>
                    <Link href={'/signin'}>Connexion</Link>
                </li>
            )}
        </ul>
    );
}
