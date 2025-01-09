import { Videos } from '#shared/types/index';
import { Box, Flex, Stack, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ReactNode } from 'react';
import { ClientOnly } from '~/components/generics/client_only';
import { VideoList } from '~/components/videos/video_list';
import { VideoMeta } from '~/components/videos/video_meta';
import { VideoPlayer } from '~/components/videos/video_player';
import VideosLayout from '~/layouts/videos_layout';

interface VideosPageProps {
	videos: Videos;
}
function VideosPage({ videos }: VideosPageProps) {
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
				<Stack gap="lg">
					<ClientOnly>
						<VideoPlayer url={videos[0].url} />
					</ClientOnly>
					<VideoMeta
						title={videos[0].title}
						description={videos[0].description}
					/>
				</Stack>
			)}

			{!isSmallScreen ? (
				<Box w="100%" maw={350}>
					<VideoList videos={videos} />
				</Box>
			) : (
				<VideoList videos={videos} />
			)}
		</Flex>
	);
}

VideosPage.layout = (page: ReactNode) => <VideosLayout children={page} />;
export default VideosPage;
