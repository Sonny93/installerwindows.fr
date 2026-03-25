import { Data } from '@generated/data';
import clsx from 'clsx';
import { ContentCard } from '~/components/generics/content_card';

interface VideoCardProps extends Data.Video {
	activeVideoId?: string;
}

export const VideoCard = ({
	id,
	title,
	thumbnail,
	publishedAt,
	activeVideoId,
}: Readonly<VideoCardProps>) => (
	<ContentCard
		href={`/videos/${id}`}
		thumbnailSrc={thumbnail}
		thumbnailAlt=""
		meta={publishedAt}
		title={title}
		dataActive={activeVideoId === id ? 'true' : 'false'}
		metaClassName="text-gray-700 dark:text-gray-300"
		titleClassName={clsx(
			activeVideoId === id
				? 'text-blue-500 dark:text-blue-300'
				: 'text-gray-900 dark:text-gray-100'
		)}
	/>
);
