import { Data } from '@generated/data';
import { ContentCard } from '~/components/generics/content_card';

interface GuideCardProps {
	guide: Data.Guide;
}

export const GuideCard = ({ guide }: Readonly<GuideCardProps>) => (
	<ContentCard
		href={`/guides/${guide.slug}`}
		thumbnailSrc={guide.thumbnail}
		thumbnailAlt={`${guide.title} thumbnail`}
		meta={guide.createdAt}
		title={guide.title}
		metaClassName="text-gray-600 dark:text-slate-400"
		titleClassName="text-gray-900 dark:text-slate-100 font-medium"
	/>
);
