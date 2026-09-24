import { Data } from '@generated/data';

import { cn } from '~/lib/cn';
import { urlFor } from '~/lib/url_for';
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
		href={urlFor('videos.show_videos', { videoId: id })}
		thumbnailSrc={thumbnail}
		thumbnailAlt=""
		meta={publishedAt}
		title={title}
		dataActive={activeVideoId === id ? 'true' : 'false'}
		metaClassName="text-gray-700 dark:text-gray-300"
		titleClassName={cn(
			activeVideoId === id
				? 'text-blue-500 dark:text-blue-300'
				: 'text-gray-900 dark:text-gray-100'
		)}
	/>
);
