import type { Data } from '@generated/data';

import { AutoplayToggle } from '~/videos/show_videos/autoplay_toggle';
import { EpisodeNavigation } from '~/videos/show_videos/episode_navigation';
import { EpisodeRail } from '~/videos/show_videos/episode_rail';
import { useVideoAutoplay } from '~/videos/show_videos/use_video_autoplay';
import { VideoDescription } from '~/videos/show_videos/video_description';
import { VideoHeader } from '~/videos/show_videos/video_header';
import { VideoPlayer } from '~/videos/show_videos/video_player';

interface ShowVideosProps {
	videos: Data.Video[];
	currentVideo: Data.Video.Variants['forPlayer'];
	previousVideo: Data.Video | undefined;
	nextVideo: Data.Video | undefined;
}

export default function ShowVideos({
	videos,
	currentVideo,
	previousVideo,
	nextVideo,
}: Readonly<ShowVideosProps>) {
	const firstVideo = videos.at(0);
	const hasDescription = currentVideo.description.length > 0;
	const {
		isAutoplayEnabled,
		setAutoplayEnabled,
		handlePlayerReady,
		handlePlayerEnded,
	} = useVideoAutoplay({ nextVideoId: nextVideo?.id });

	return (
		<div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
			<div className="flex flex-col gap-6">
				<VideoPlayer
					key={currentVideo.id}
					videoId={currentVideo.id}
					title={currentVideo.episodeTitle}
					onReady={handlePlayerReady}
					onEnded={handlePlayerEnded}
				/>
				<VideoHeader
					episodeNumber={currentVideo.episodeNumber}
					episodeTitle={currentVideo.episodeTitle}
					publishedAt={currentVideo.publishedAt}
				/>
				<EpisodeNavigation
					previousVideo={previousVideo}
					nextVideo={nextVideo}
					firstVideo={firstVideo}
				/>
				{hasDescription ? (
					<VideoDescription description={currentVideo.description} />
				) : null}
			</div>
			<aside className="lg:sticky lg:top-20">
				<EpisodeRail videos={videos} currentVideoId={currentVideo.id} />
				<AutoplayToggle
					isEnabled={isAutoplayEnabled}
					onToggle={setAutoplayEnabled}
				/>
			</aside>
		</div>
	);
}
