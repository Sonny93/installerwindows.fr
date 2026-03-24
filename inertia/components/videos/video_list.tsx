import { Data } from '@generated/data';
import { router } from '@inertiajs/react';
import { Box, Button, Divider, Stack } from '@mantine/core';
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

function removeVideoFromList(videos: Data.Video[], nextVideo: Data.Video) {
	return videos.filter((video) => video.id !== nextVideo.id);
}
