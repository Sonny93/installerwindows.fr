import { Video, Videos } from '#shared/types/index';
import { Box, Flex, Stack, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ClientOnly } from '~/components/generics/client_only';
import { VideoList } from '~/components/videos/video_list';
import { VideoMeta } from '~/components/videos/video_meta';
import { VideoPlayer } from '~/components/videos/video_player';

interface VideosPageProps {
	videos: Videos;
	currentVideo: Video;
	nextVideo: Video;
}
function VideosPage({ videos, currentVideo, nextVideo }: VideosPageProps) {
	const theme = useMantineTheme();
	const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	return (
		<Flex
			align="flex-start"
			wrap="nowrap"
			gap="xl"
			direction={isSmallScreen ? 'column' : 'row'}
		>
			{videos.at(0) && (
				<Stack gap="lg" w="100%">
					<ClientOnly>
						<VideoPlayer url={currentVideo.url} />
					</ClientOnly>
					<VideoMeta
						title={currentVideo.title}
						description={currentVideo.description}
						publishedAt={currentVideo.publishedAt}
					/>
				</Stack>
			)}

			{!isSmallScreen ? (
				<Box w="100%" maw={350}>
					<VideoList
						videos={videos}
						nextVideo={nextVideo}
						activeVideoId={currentVideo.id}
					/>
				</Box>
			) : (
				<VideoList
					videos={videos}
					nextVideo={nextVideo}
					activeVideoId={currentVideo.id}
				/>
			)}
		</Flex>
	);
}

export default VideosPage;
