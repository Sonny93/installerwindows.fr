import ReactPlayer from 'react-player';

interface VideoPlayerProps {
	url: string;
}

export const VideoPlayer = ({ url }: Readonly<VideoPlayerProps>) => (
	<div className="relative aspect-video w-full min-h-0 flex-1">
		<ReactPlayer
			height="100%"
			width="100%"
			className="!aspect-video overflow-hidden rounded-md"
			style={{
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
	</div>
);
