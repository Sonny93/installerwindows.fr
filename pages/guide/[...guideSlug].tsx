import MarkdownPage from '../../Components/GitHub/PageLayout';
import { db } from '../../lib/db';
import { downloadMarkdown } from '../../Utils';

interface PageGuideProps {
    guide: Guide;
    guideSlug: string;
    markdown: string;
}
export default function PageGuide({ guide, guideSlug, markdown }: PageGuideProps) {
    return (
        <MarkdownPage
            content={markdown}
            url={guide.github.source}
            urlRaw={guide.github.raw}
            pageTitle={guide.title}
        />
    );
}

export async function getServerSideProps(context) {
    const guideSlug = context.query.guideSlug?.[0] || '';
    const guide = db.data.guides.find(({ slug }) => slug === guideSlug);

    if (!guide || guide.isDraft) {
        return {
            redirect: {
                permanent: false,
                destination: '/404',
            },
            props: {},
        };
    }

    const markdown = await downloadMarkdown(guide.github.raw);
    return {
        props: {
            guide,
            guideSlug,
            markdown,
        },
    };
}
