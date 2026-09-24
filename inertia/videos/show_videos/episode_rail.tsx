import { Data } from '@generated/data';

import { EpisodeRailItem } from '~/videos/show_videos/episode_rail_item';
import { resolveEpisodeRailItemProgress } from '~/videos/show_videos/episode_rail_progress';

interface EpisodeRailProps {
	videos: Data.Video[];
	currentVideoId: string;
}

export function EpisodeRail({
	videos,
	currentVideoId,
}: Readonly<EpisodeRailProps>) {
	const currentIndex = videos.findIndex((video) => video.id === currentVideoId);
	const position = currentIndex + 1;
	const total = videos.length;
	const progressPercentage = total > 0 ? (position / total) * 100 : 0;
	const items = videos.map((video, index) => ({
		video,
		...resolveEpisodeRailItemProgress(index, currentIndex, total),
	}));

	return (
		<nav aria-label="Vidéos de la série">
			<div className="flex items-baseline justify-between gap-2">
				<h2 className="text-lg text-gray-900 dark:text-gray-100">
					Toutes les vidéos
				</h2>
				<span className="text-sm tabular-nums text-gray-500 dark:text-gray-400">
					{position} / {total}
				</span>
			</div>
			<div
				role="progressbar"
				aria-label="Progression dans la série"
				aria-valuenow={position}
				aria-valuemin={0}
				aria-valuemax={total}
				className="mt-2 h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700"
			>
				<div
					className="h-1 rounded-full bg-blue-500"
					style={{ width: `${progressPercentage}%` }}
				/>
			</div>
			<ol className="mt-4 flex flex-col">
				{items.map(({ video, state, segmentAbove, segmentBelow }) => (
					<EpisodeRailItem
						key={video.id}
						video={video}
						state={state}
						segmentAbove={segmentAbove}
						segmentBelow={segmentBelow}
					/>
				))}
			</ol>
		</nav>
	);
}
