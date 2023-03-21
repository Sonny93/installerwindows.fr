import { getGuides } from '../../../lib/db';

export default function GuideEdit({ guide }: { guide: Guide }) {
    return <pre>{JSON.stringify(guide, null, 2)}</pre>;
}

export async function getServerSideProps({ query }) {
    const guideSlug = query.guideSlug?.[0] || '';
    const guide = (await getGuides()).find(({ slug }) => slug === guideSlug);
    if (!guide) {
        return { redirect: { destination: '/guides' } };
    }

    return {
        props: {
            guide,
        },
    };
}
