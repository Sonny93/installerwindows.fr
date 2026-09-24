const YOUTUBE_IFRAME_API_SCRIPT_SRC = 'https://www.youtube.com/iframe_api';

export interface YoutubePlayer {
	playVideo: () => void;
	destroy: () => void;
}

export interface YoutubePlayerEvent {
	target: YoutubePlayer;
}

export interface YoutubePlayerStateChangeEvent extends YoutubePlayerEvent {
	data: number;
}

export interface YoutubePlayerEvents {
	onReady?: (event: YoutubePlayerEvent) => void;
	onStateChange?: (event: YoutubePlayerStateChangeEvent) => void;
}

interface YoutubePlayerConstructor {
	new (
		element: HTMLIFrameElement,
		options: { events: YoutubePlayerEvents }
	): YoutubePlayer;
}

export interface YoutubeIframeApi {
	Player: YoutubePlayerConstructor;
	PlayerState: { ENDED: number };
}

declare global {
	interface Window {
		YT?: YoutubeIframeApi;
		onYouTubeIframeAPIReady?: () => void;
	}
}

class YoutubeIframeApiLoadError extends Error {
	constructor() {
		super('Failed to load the YouTube iframe API script');
		this.name = 'YoutubeIframeApiLoadError';
	}
}

let youtubeIframeApiPromise: Promise<YoutubeIframeApi> | undefined;

/**
 * Loads the YouTube iframe API script once per page load and resolves with
 * the global `YT` namespace it installs. Callers share the same cached
 * promise, an API already loaded by another caller resolves immediately, and
 * any `onYouTubeIframeAPIReady` callback set before this ran is chained
 * rather than overwritten.
 */
export function loadYoutubeIframeApi(): Promise<YoutubeIframeApi> {
	if (youtubeIframeApiPromise) return youtubeIframeApiPromise;

	youtubeIframeApiPromise = new Promise((resolve, reject) => {
		if (window.YT?.Player) {
			resolve(window.YT);
			return;
		}

		const previousReadyCallback = window.onYouTubeIframeAPIReady;
		window.onYouTubeIframeAPIReady = () => {
			previousReadyCallback?.();
			if (window.YT) resolve(window.YT);
		};

		const script = document.createElement('script');
		script.src = YOUTUBE_IFRAME_API_SCRIPT_SRC;
		script.addEventListener('error', () => {
			youtubeIframeApiPromise = undefined;
			script.remove();
			reject(new YoutubeIframeApiLoadError());
		});
		document.head.appendChild(script);
	});

	return youtubeIframeApiPromise;
}
