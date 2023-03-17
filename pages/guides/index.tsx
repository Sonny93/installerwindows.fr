import { useSession } from 'next-auth/react';
import Link from 'next/link';

import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import { getGuides } from '../../lib/db';

interface PageGuidesProps {
    guides: Guide[];
}
export default function PageGuides({ guides }: PageGuidesProps) {
    const session = useSession();

    return (
        <div>
            <Navbar />
            <h1 style={{ textAlign: 'center' }}>Guides</h1>
            <ul style={{ paddingLeft: '2em' }}>
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
            <Footer />
        </div>
    );
}

export async function getServerSideProps() {
    const guides = (await getGuides()).filter(({ isDraft }) => !isDraft);
    return { props: { guides } };
}
