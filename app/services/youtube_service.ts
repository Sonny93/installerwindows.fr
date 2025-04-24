import RemoteApiErrorException from '#exceptions/remote_api_error_exception';
import { CacheService } from '#services/cache_service';
import { Videos } from '#shared/types/index';
import env from '#start/env';
import { inject } from '@adonisjs/core';
import logger from '@adonisjs/core/services/logger';
import { DateTime } from 'luxon';
import { dateTimeSerializer } from '../libs/index.js';

interface VideoInfo {
	title: string;
	thumbnail: string;
	description: string;
	url: string;
}

@inject()
export class YoutubeService {
	private playlistId: string = env.get('YOUTUBE_PLAYLIST_ID');
	private apiKey: string = env.get('YOUTUBE_API_KEY');
	private apiUrl: string = `https://www.googleapis.com/youtube/v3/playlistItems`;

	constructor(private cacheService: CacheService) {}

	/**
	 * Fetches videos from a YouTube playlist, leveraging caching for optimization.
	 * @returns A list of videos with their details.
	 */
	async getPlaylist(): Promise<Videos> {
		const videos = await this.cacheService.getOrSet({
			ns: 'youtube',
			key: this.playlistId,
			factory: async () => this.fetchPlaylist(this.playlistId),
		});
		return videos;
	}

	/**
	 * Fetches raw playlist data from the YouTube Data API.
	 * @param playlistId The ID of the YouTube playlist.
	 * @returns A list of video information objects.
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
	 * Builds a thumbnail URL for a YouTube video.
	 * @param videoId The ID of the YouTube video.
	 * @returns The URL of the video thumbnail.
	 */
	private videoThumbnailUrlBuilder(videoId: string): string {
		return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
	}
}
