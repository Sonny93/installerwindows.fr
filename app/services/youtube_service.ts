import RemoteApiErrorException from '#exceptions/remote_api_error_exception';
import { CacheService } from '#services/cache_service';
import env from '#start/env';
import { inject } from '@adonisjs/core';
import logger from '@adonisjs/core/services/logger';
import { DateTime } from 'luxon';
import { dateTimeSerializer } from '../libs/index.js';

export interface VideoInfo {
	id: string;
	title: string;
	thumbnail: string;
	description: string;
	url: string;
	publishedAt: string;
}

@inject()
export class YoutubeService {
	private readonly playlistId: string = env.get('YOUTUBE_PLAYLIST_ID');
	private readonly apiKey: string = env.get('YOUTUBE_API_KEY');
	private readonly apiUrl: string = `https://www.googleapis.com/youtube/v3/playlistItems`;

	/**
	 * @param cacheService Cache service used to avoid repeated YouTube API calls.
	 */
	constructor(private readonly cacheService: CacheService) {}

	/**
	 * Fetches videos from the configured playlist, using the cache when data is still valid.
	 * @returns List of video metadata serialized for the application.
	 */
	async getPlaylist(): Promise<VideoInfo[]> {
		const videos = await this.cacheService.getOrSet({
			ns: 'youtube',
			key: this.playlistId,
			factory: async () => this.fetchPlaylist(this.playlistId),
		});
		return videos;
	}

	/**
	 * Calls the YouTube Data API v3 to list playlist items and maps each item to the shape expected by the app.
	 * @param playlistId YouTube playlist identifier.
	 * @throws RemoteApiErrorException when the HTTP response indicates an error.
	 * @returns Array of objects describing title, thumbnail, description, URL, and publish date.
	 */
	private async fetchPlaylist(playlistId: string): Promise<VideoInfo[]> {
		const url = new URL(this.apiUrl);
		url.searchParams.append('part', 'snippet');
		url.searchParams.append('playlistId', playlistId);
		url.searchParams.append('maxResults', '50');
		url.searchParams.append('key', this.apiKey);

		const response = await fetch(url.toString());
		if (!response.ok) {
			logger.debug('Youtube API error ' + (await response.text()));
			throw new RemoteApiErrorException('youtube', url.toString());
		}

		const data = await response.json();
		return (data as any).items.map((item: any) => {
			const snippet = item.snippet;
			return {
				id: snippet.resourceId.videoId,
				title: snippet.title,
				thumbnail: this.videoThumbnailUrlBuilder(snippet.resourceId.videoId),
				description: snippet.description,
				url: `https://www.youtube.com/watch?v=${snippet.resourceId.videoId}`,
				publishedAt: dateTimeSerializer(DateTime.fromISO(snippet.publishedAt)),
			};
		});
	}

	/**
	 * Builds the high-resolution thumbnail URL served by YouTube’s image CDN.
	 * @param videoId YouTube video identifier.
	 * @returns HTTPS URL pointing at maxresdefault.jpg.
	 */
	private videoThumbnailUrlBuilder(videoId: string): string {
		return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
	}
}
