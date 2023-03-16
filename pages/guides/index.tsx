import { useSession } from 'next-auth/react';
import Link from 'next/link';

import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import { db } from '../../lib/db';

interface PageGuidesProps {
    guides: Guide[];
}
export default function PageGuides({ guides }: PageGuidesProps) {
    const session = useSession();

    return (
        <div>
            <Navbar />
            <h1>Guides</h1>
            <ul>
                {guides.length > 0 ? (
                    guides.map(({ slug, title, isDraft }) => (
                        <li key={slug}>
                            {!isDraft && <Link href={`/guide/${slug}`}>{title}</Link>}
                        </li>
                    ))
                ) : (
                    <p>Aucun guide disponible</p>
                )}
                {session.data && (
                    <li>
                        <Link href={'/guides/create'}>Ajouter un guide</Link>
                    </li>
                )}
            </ul>
            <Footer />
        </div>
    );
}

export async function getServerSideProps() {
    const guides = await db.data.guides.filter(({ isDraft }) => !isDraft);
    return { props: { guides } };
}
