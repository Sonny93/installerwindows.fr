import { Video, Videos } from '#shared/types/index';
import { router } from '@inertiajs/react';
import { Box, Button, Divider, Stack } from '@mantine/core';
import { VideoCard } from '~/components/videos/card/video_card';

interface VideoListProps {
	videos: Videos;
	nextVideo: Video;
	activeVideoId?: string;
}

export function VideoList({
	videos: videosProps,
	nextVideo,
	activeVideoId,
}: VideoListProps) {
	const videos = nextVideo
		? removeVideoFromList(videosProps, nextVideo)
		: videosProps;

	return (
		<>
			{nextVideo && (
				<Box>
					<Divider label="Prochaine vidéo" mb="sm" />
					<VideoCard
						{...nextVideo}
						activeVideoId={activeVideoId}
						key={nextVideo.id}
					/>
				</Box>
			)}
			{!nextVideo && (
				<Button
					variant="outline"
					onClick={() => router.visit('/videos')}
					fullWidth
				>
					Revenir à la première vidéo
				</Button>
			)}
			<Box>
				<Divider label="Toutes les vidéos" mt={'lg'} mb="sm" />
				<Stack align="center" w="100%" gap="lg">
					{videos.map((video) => (
						<VideoCard
							{...video}
							activeVideoId={activeVideoId}
							key={video.id}
						/>
					))}
				</Stack>
			</Box>
		</>
	);
}

function removeVideoFromList(videos: Videos, nextVideo: Video) {
	return videos.filter((v) => v.id !== nextVideo.id);
}
