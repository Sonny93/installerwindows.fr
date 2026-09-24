import { useRef } from 'react';

import type { YoutubePlayer } from '~/videos/show_videos/load_youtube_iframe_api';
import { useYoutubePlayerEvents } from '~/videos/show_videos/use_youtube_player_events';

const YOUTUBE_NOCOOKIE_EMBED_URL = 'https://www.youtube-nocookie.com/embed';
const ENABLE_JS_API_QUERY_PARAM = 'enablejsapi';

interface VideoPlayerProps {
	videoId: string;
	title: string;
	onReady: (player: YoutubePlayer) => void;
	onEnded: () => void;
}

function buildEmbedUrl(videoId: string): string {
	const embedUrl = new URL(`${YOUTUBE_NOCOOKIE_EMBED_URL}/${videoId}`);
	embedUrl.searchParams.set(ENABLE_JS_API_QUERY_PARAM, '1');
	return embedUrl.toString();
}

export function VideoPlayer({
	videoId,
	title,
	onReady,
	onEnded,
}: Readonly<VideoPlayerProps>) {
	const iframeRef = useRef<HTMLIFrameElement | null>(null);

	useYoutubePlayerEvents(iframeRef, { onReady, onEnded });

	return (
		<div className="aspect-video w-full overflow-hidden rounded-lg bg-black shadow-md">
			<iframe
				ref={iframeRef}
				src={buildEmbedUrl(videoId)}
				title={title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
				referrerPolicy="strict-origin-when-cross-origin"
				className="size-full border-0"
			/>
		</div>
	);
}
