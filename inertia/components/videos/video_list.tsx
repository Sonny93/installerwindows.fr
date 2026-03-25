import { Data } from '@generated/data';
import { router } from '@inertiajs/react';
import { Button } from '@minimalstuff/ui';
import { VideoCard } from '~/components/videos/card/video_card';

interface VideoListProps {
	videos: Data.Video[];
	nextVideo: Data.Video | undefined;
	activeVideoId?: string;
}

export function VideoList({
	videos: videosProps,
	nextVideo,
	activeVideoId,
}: Readonly<VideoListProps>) {
	const videos = nextVideo
		? removeVideoFromList(videosProps, nextVideo)
		: videosProps;

	return (
		<>
			{nextVideo ? (
				<div>
					<div className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
						<span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
						<span className="shrink-0">Prochaine vidéo</span>
						<span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
					</div>
					<VideoCard
						{...nextVideo}
						activeVideoId={activeVideoId}
						key={nextVideo.id}
					/>
				</div>
			) : (
				<Button
					variant="outline"
					onClick={() => router.visit('/videos')}
					fullWidth
				>
					Revenir à la première vidéo
				</Button>
			)}
			<div>
				<div className="mb-2 mt-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
					<span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
					<span className="shrink-0">Toutes les vidéos</span>
					<span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
				</div>
				<div className="flex w-full flex-col items-center gap-6">
					{videos.map((video) => (
						<VideoCard
							{...video}
							activeVideoId={activeVideoId}
							key={video.id}
						/>
					))}
				</div>
			</div>
		</>
	);
}

function removeVideoFromList(videos: Data.Video[], nextVideo: Data.Video) {
	return videos.filter((video) => video.id !== nextVideo.id);
}
