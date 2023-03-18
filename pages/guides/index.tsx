import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import { getGuides } from '../../lib/db';

import styles from './guides.module.scss';

interface PageGuidesProps {
    guides: Guide[];
}
export default function PageGuides({ guides }: PageGuidesProps) {
    const session = useSession();

    return (
        <div className={styles['guides']}>
            <NextSeo title={'Guides'} />
            <Navbar />
            <main>
                <h1 style={{ textAlign: 'center' }}>Guides</h1>
                <ul style={{ paddingLeft: '2em', flex: '1' }}>
                    {guides.length > 0 ? (
                        guides.map(({ slug, title, isDraft }) => (
                            <li key={slug} style={{ listStyle: 'disc', marginBottom: '15px' }}>
                                {!isDraft && <Link href={`/guide/${slug}`}>{title}</Link>}
                            </li>
                        ))
                    ) : (
                        <p>Aucun guide disponible</p>
                    )}
                </ul>
                {session.data && <Link href={'/guides/create'}>Ajouter un guide</Link>}
                <p style={{ textAlign: 'center' }}>
                    Vous souhaitez proposer un nouveau guide ou faire un retour ?<br />
                    <Link
                        href={'https://discord.com/invite/informatique'}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Rejoingez le serveur Discord
                    </Link>{' '}
                    et faites une proposition dans le salon{' '}
                    <Link
                        href="https://discord.com/channels/475253577288253440/1036644757524451478"
                        target="_blank"
                        rel="noreferrer"
                    >
                        idées-pour-le-serveur
                    </Link>
                    .
                </p>
            </main>
            <Footer />
        </div>
    );
}

export async function getServerSideProps() {
    const guides = (await getGuides()).filter(({ isDraft }) => !isDraft);
    return { props: { guides } };
}
