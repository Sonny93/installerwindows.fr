import type { Data } from '@generated/data';

import { ContentCard } from '~/shared/content_card';
import { urlFor } from '~/shared/lib/url_for';

interface GuideCardProps {
	guide: Data.Guide;
}

export const GuideCard = ({ guide }: Readonly<GuideCardProps>) => (
	<ContentCard
		href={urlFor('guides.show_guide', { guideSlug: guide.slug })}
		thumbnailSrc={guide.thumbnail}
		thumbnailAlt={`${guide.title} thumbnail`}
		meta={guide.createdAt}
		title={guide.title}
		bodyClassName="pt-3"
		metaClassName="text-gray-700 dark:text-gray-300"
		titleClassName="text-black dark:text-white"
	/>
);
