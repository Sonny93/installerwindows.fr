import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
            <NextSeo
                title={'Guides'}
                description="Tous les guides pour (ré)installer Windows 10/11 au propre et faire des optimisations saines pour votre machine."
            />
            <Navbar />
            <main>
                <h1 style={{ textAlign: 'center' }}>Guides</h1>
                <ul className={styles['guide-list']}>
                    {guides.length > 0 ? (
                        guides.map((guide: Guide) => <GuideItem guide={guide} key={guide.slug} />)
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
                        Rejoignez le serveur Discord
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

function GuideItem({ guide }: { guide: Guide }) {
    const defaultImageUrl = '/images/guides/default.png';

    const { slug, title, thumbnail } = guide;
    const [imageSource, setImageSource] = useState<string>(thumbnail || defaultImageUrl);

    return (
        <li className={styles['guide-item']}>
            <Link href={`/guide/${slug}`} className={'reset'}>
                <Image
                    src={imageSource}
                    onError={() => setImageSource(defaultImageUrl)}
                    alt="Default Guide Thumbnail"
                    width={350}
                    height={197}
                    priority
                />
                <span>{title}</span>
            </Link>
        </li>
    );
}

export async function getServerSideProps() {
    const guides = (await getGuides()).filter(({ isDraft }) => !isDraft);
    return { props: { guides } };
}
