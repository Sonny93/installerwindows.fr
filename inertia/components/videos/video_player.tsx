import { Box } from '@mantine/core';
import ReactPlayer from 'react-player';

interface YoutubePlayerProps {
	url: string;
}

export const VideoPlayer = ({ url }: YoutubePlayerProps) => (
	<Box
		style={{
			position: 'relative',
			minHeight: '100%',
			height: '100%',
			width: '100%',
			flex: 1,
			aspectRatio: '16/9',
		}}
	>
		<ReactPlayer
			height="auto"
			width="100%"
			style={{
				aspectRatio: '16/9',
				flex: 1,
				borderRadius: 'var(--mantine-radius-md)',
				overflow: 'hidden',
				transition: 'opacity 0.3s ease-in-out',
			}}
			src={url}
			config={{
				youtube: {
					color: 'white',
				},
			}}
			preload="auto"
			controls
		/>
	</Box>
);
