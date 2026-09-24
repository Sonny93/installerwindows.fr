import { router } from '@inertiajs/react';
import { useCallback, useEffect, useRef } from 'react';

import { urlFor } from '~/shared/lib/url_for';
import type { YoutubePlayer } from '~/videos/show_videos/load_youtube_iframe_api';
import { useAutoplayPreference } from '~/videos/show_videos/use_autoplay_preference';

interface UseVideoAutoplayOptions {
	nextVideoId: string | undefined;
}

export interface UseVideoAutoplayReturn {
	isAutoplayEnabled: boolean;
	setAutoplayEnabled: (isEnabled: boolean) => void;
	handlePlayerReady: (player: YoutubePlayer) => void;
	handlePlayerEnded: () => void;
}

/**
 * Wires the autoplay preference to the current player: starts a freshly
 * mounted player on its own when the preference is on, and navigates to the
 * next video when the current one ends. The preference and the next video id
 * are read through refs from inside the player callbacks so the callbacks
 * stay valid without ever forcing the YT.Player (created once per video) to
 * be recreated.
 */
export function useVideoAutoplay({
	nextVideoId,
}: UseVideoAutoplayOptions): UseVideoAutoplayReturn {
	const { isAutoplayEnabled, setAutoplayEnabled } = useAutoplayPreference();

	const isAutoplayEnabledRef = useRef(isAutoplayEnabled);
	const nextVideoIdRef = useRef(nextVideoId);

	useEffect(() => {
		isAutoplayEnabledRef.current = isAutoplayEnabled;
		nextVideoIdRef.current = nextVideoId;
	});

	const handlePlayerReady = useCallback((player: YoutubePlayer) => {
		if (isAutoplayEnabledRef.current) player.playVideo();
	}, []);

	const handlePlayerEnded = useCallback(() => {
		if (!isAutoplayEnabledRef.current) return;

		const nextVideoId = nextVideoIdRef.current;
		if (!nextVideoId) return;

		router.visit(urlFor('videos.show_videos', { videoId: nextVideoId }));
	}, []);

	return {
		isAutoplayEnabled,
		setAutoplayEnabled,
		handlePlayerReady,
		handlePlayerEnded,
	};
}
