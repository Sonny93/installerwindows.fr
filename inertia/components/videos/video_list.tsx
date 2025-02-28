import { Videos } from '#shared/types/index';
import { Stack } from '@mantine/core';
import { VideoCard } from '~/components/videos/card/video_card';

interface VideoListProps {
	videos: Videos;
	activeVideoId?: string;
}

export const VideoList = ({ videos, activeVideoId }: VideoListProps) => (
	<Stack align="center" w="100%" gap="lg">
		{videos.map((video) => (
			<VideoCard {...video} activeVideoId={activeVideoId} key={video.id} />
		))}
	</Stack>
);
