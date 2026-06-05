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
		metaClassName="text-gray-600 dark:text-slate-400"
		titleClassName={clsx(
			'font-medium',
			activeVideoId === id
				? 'text-blue-600 dark:text-blue-400'
				: 'text-gray-900 dark:text-slate-100'
		)}
	/>
);
