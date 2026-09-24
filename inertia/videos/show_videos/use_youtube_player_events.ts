import { useEffect, useRef, type RefObject } from 'react';

import {
	loadYoutubeIframeApi,
	type YoutubePlayer,
	type YoutubePlayerEvent,
	type YoutubePlayerStateChangeEvent,
} from '~/videos/show_videos/load_youtube_iframe_api';

interface UseYoutubePlayerEventsOptions {
	onReady: (player: YoutubePlayer) => void;
	onEnded: () => void;
}

/**
 * Creates a YT.Player bound to the given iframe once it mounts. The latest
 * `onReady`/`onEnded` are always read through refs, so callers can pass new
 * callback identities on every render without the player being destroyed and
 * recreated — it is only ever created once for the lifetime of this iframe.
 * A load failure is logged and otherwise ignored: the iframe still plays the
 * video manually, only the API-driven events are lost.
 */
export function useYoutubePlayerEvents(
	iframeRef: RefObject<HTMLIFrameElement | null>,
	{ onReady, onEnded }: UseYoutubePlayerEventsOptions
): void {
	const onReadyRef = useRef(onReady);
	const onEndedRef = useRef(onEnded);

	useEffect(() => {
		onReadyRef.current = onReady;
		onEndedRef.current = onEnded;
	});

	useEffect(() => {
		const iframe = iframeRef.current;
		if (!iframe) return;

		let isUnmounted = false;
		let player: YoutubePlayer | undefined;

		loadYoutubeIframeApi()
			.then((youtubeIframeApi) => {
				if (isUnmounted) return;

				player = new youtubeIframeApi.Player(iframe, {
					events: {
						onReady: (event: YoutubePlayerEvent) => {
							onReadyRef.current(event.target);
						},
						onStateChange: (event: YoutubePlayerStateChangeEvent) => {
							if (event.data === youtubeIframeApi.PlayerState.ENDED) {
								onEndedRef.current();
							}
						},
					},
				});
			})
			.catch((error: unknown) => {
				console.error('Failed to load the YouTube iframe API', error);
			});

		return () => {
			isUnmounted = true;
			player?.destroy();
		};
	}, [iframeRef]);
}
