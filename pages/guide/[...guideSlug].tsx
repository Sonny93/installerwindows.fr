import { getServerSession } from 'next-auth';
import Link from 'next/link';
import MarkdownPage from '../../Components/GitHub/PageLayout';
import { getGuides } from '../../lib/db';
import { downloadMarkdown } from '../../utils';
import { authOptions } from '../api/auth/[...nextauth]';

interface PageGuideProps {
    guide: Guide;
    markdown: string;
}
export default function PageGuide({ guide, markdown }: PageGuideProps) {
    return (
        <>
            {guide.isDraft && (
                <p
                    style={{
                        zIndex: '9',
                        position: 'fixed',
                        bottom: '1em',
                        left: '50%',
                        backgroundColor: 'rgb(168, 27, 27)',
                        padding: '.5em',
                        borderRadius: '3px',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    Ce guide est un brouillon •{' '}
                    <Link href={`/guides/edit/${guide.slug}`}>Modifier</Link>
                </p>
            )}
            <MarkdownPage
                content={markdown}
                url={guide.github.source}
                urlRaw={guide.github.raw}
                pageTitle={guide.title}
            />
        </>
    );
}

export async function getServerSideProps({ req, res, query }) {
    const session = await getServerSession(req, res, authOptions);
    const guideSlug = query.guideSlug?.[0] || '';
    const guide = (await getGuides()).find(({ slug }) => slug === guideSlug);

    if (!guide || (!session && guide.isDraft)) {
        return {
            redirect: {
                permanent: false,
                destination: '/guides',
            },
            props: {},
        };
    }

    const markdown = await downloadMarkdown(guide.github.raw);
    return {
        props: {
            guide,
            markdown,
        },
    };
}
