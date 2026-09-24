import { Data } from '@generated/data';
import { Link } from '@adonisjs/inertia/react';

import { cn } from '~/shared/lib/cn';
import { urlFor } from '~/shared/lib/url_for';
import { EpisodeMarker } from '~/videos/show_videos/episode_marker';
import type { EpisodeMarkerState } from '~/videos/show_videos/episode_marker_state';
import type { EpisodeRailSegmentColor } from '~/videos/show_videos/episode_rail_segment_color';

interface EpisodeRailItemProps {
	video: Data.Video;
	state: EpisodeMarkerState;
	/** Half-segment connecting to the previous marker, 'none' on the first item. */
	segmentAbove: EpisodeRailSegmentColor;
	/** Half-segment connecting to the next marker, 'none' on the last item. */
	segmentBelow: EpisodeRailSegmentColor;
}

const titleByState: Record<EpisodeMarkerState, string> = {
	past: 'text-gray-500 dark:text-gray-400',
	current: 'font-medium text-gray-900 dark:text-white',
	upcoming:
		'text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-300',
};

const segmentColorClass: Record<'blue' | 'gray', string> = {
	blue: 'bg-blue-500',
	gray: 'bg-gray-200 dark:bg-gray-700',
};

export const EpisodeRailItem = ({
	video,
	state,
	segmentAbove,
	segmentBelow,
}: Readonly<EpisodeRailItemProps>) => (
	<li className="relative">
		{segmentAbove === 'none' ? null : (
			<span
				aria-hidden="true"
				className={cn(
					'absolute left-4 top-0 h-1/2 w-px -translate-x-1/2',
					segmentColorClass[segmentAbove]
				)}
			/>
		)}
		{segmentBelow === 'none' ? null : (
			<span
				aria-hidden="true"
				className={cn(
					'absolute bottom-0 left-4 top-1/2 w-px -translate-x-1/2',
					segmentColorClass[segmentBelow]
				)}
			/>
		)}
		<Link
			href={urlFor('videos.show_videos', { videoId: video.id })}
			prefetch="hover"
			aria-current={state === 'current' ? 'page' : undefined}
			className="group relative z-10 flex items-center gap-3 rounded-lg py-1.5 pr-2 focus-visible:outline-2 focus-visible:outline-blue-500"
		>
			<EpisodeMarker episodeNumber={video.episodeNumber} state={state} />
			<span className={cn('line-clamp-2 text-sm', titleByState[state])}>
				{video.episodeTitle}
			</span>
		</Link>
	</li>
);
