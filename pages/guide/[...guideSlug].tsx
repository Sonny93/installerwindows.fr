import MarkdownPage from '../../Components/GitHub/PageLayout';
import { getGuides } from '../../lib/db';
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
    const guide = (await getGuides()).find(({ slug }) => slug === guideSlug);

    if (!guide || guide.isDraft) {
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
            guideSlug,
            markdown,
        },
    };
}
