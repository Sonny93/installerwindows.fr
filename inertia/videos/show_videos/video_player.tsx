const YOUTUBE_NOCOOKIE_EMBED_URL = 'https://www.youtube-nocookie.com/embed';

interface VideoPlayerProps {
	videoId: string;
	title: string;
}

export const VideoPlayer = ({ videoId, title }: Readonly<VideoPlayerProps>) => (
	<div className="aspect-video w-full overflow-hidden rounded-lg bg-black shadow-md">
		<iframe
			src={`${YOUTUBE_NOCOOKIE_EMBED_URL}/${videoId}`}
			title={title}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowFullScreen
			referrerPolicy="strict-origin-when-cross-origin"
			className="size-full border-0"
		/>
	</div>
);
