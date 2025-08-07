import { Box, LoadingOverlay } from '@mantine/core';
import { useState } from 'react';
import YoutubePlayer from 'react-player/youtube';

interface YoutubePlayerProps {
	url: string;
}

export function VideoPlayer({ url }: YoutubePlayerProps) {
	const [loading, setLoading] = useState(true);
	return (
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
			<LoadingOverlay
				overlayProps={{
					bg: 'var(--mantine-color-body)',
				}}
				visible={loading}
			/>
			<YoutubePlayer
				height="auto"
				width="100%"
				style={{
					aspectRatio: '16/9',
					flex: 1,
					borderRadius: 'var(--mantine-radius-md)',
					overflow: 'hidden',
					opacity: loading ? 0 : 1,
					transition: 'opacity 0.3s ease-in-out',
				}}
				url={url}
				config={{
					playerVars: {
						autoplay: 0,
						modestbranding: 1,
						showinfo: 1,
						rel: 0,
						playsinline: 1,
						light: 1,
						controls: 1,
					},
				}}
				// This event is not working on 3.x version
				// Waiting for this pr to be merged: https://github.com/cookpete/react-player/pull/1970
				onReady={() => setLoading(false)}
			/>
		</Box>
	);
}
