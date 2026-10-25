import { inject } from '@adonisjs/core';
import logger from '@adonisjs/core/services/logger';
import type { Infer } from '@vinejs/vine/types';
import { DateTime } from 'luxon';

import RemoteApiErrorException from '#exceptions/remote_api_error_exception';
import { dateTimeSerializer } from '#libs/date_time_serializer';
import { CacheService } from '#markdown/cache_service';
import env from '#start/env';
import { youtubePlaylistItemsValidator } from '#videos/validators/youtube_playlist_items_validator';

export interface VideoInfo {
	id: string;
	title: string;
	thumbnail: string;
	description: string;
	url: string;
	publishedAt: string;
}

type YoutubePlaylistItem = Infer<
	typeof youtubePlaylistItemsValidator
>['items'][number];

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
	 * @throws RemoteApiErrorException when the HTTP response indicates an error or the response body fails validation.
	 * @returns Array of objects describing title, thumbnail, description, URL, and publish date.
	 */
	private async fetchPlaylist(playlistId: string): Promise<VideoInfo[]> {
		const url = new URL(this.apiUrl);
		url.searchParams.append('part', 'snippet');
		url.searchParams.append('playlistId', playlistId);
		url.searchParams.append('maxResults', '50');
		url.searchParams.append('key', this.apiKey);
		const redactedUrl = this.redactApiKey(url);

		const response = await fetch(url.toString());
		if (!response.ok) {
			logger.debug('Youtube API error ' + (await response.text()));
			throw new RemoteApiErrorException('youtube', redactedUrl);
		}

		const data: unknown = await response.json();
		const { items } = await this.validatePlaylistResponse(data, redactedUrl);
		return items.map((item) => this.toVideoInfo(item, redactedUrl));
	}

	/**
	 * Validates the raw JSON body of a playlistItems response against the expected shape.
	 * @param data Unvalidated JSON body returned by the YouTube API.
	 * @param redactedUrl Request URL with the API key stripped, used for the thrown exception's link.
	 * @throws RemoteApiErrorException when the response does not match the expected shape.
	 * @returns Validated playlistItems response.
	 */
	private async validatePlaylistResponse(
		data: unknown,
		redactedUrl: string
	): Promise<Infer<typeof youtubePlaylistItemsValidator>> {
		try {
			return await youtubePlaylistItemsValidator.validate(data);
		} catch (error) {
			logger.warn('Youtube API response failed validation: ' + error);
			throw new RemoteApiErrorException('youtube', redactedUrl);
		}
	}

	/**
	 * Maps a validated playlist item to the shape expected by the application.
	 * @param item Validated playlistItems entry.
	 * @param redactedUrl Request URL with the API key stripped, used for the thrown exception's link.
	 * @throws RemoteApiErrorException when the item's publish date is not a valid ISO date.
	 * @returns Video metadata serialized for the application.
	 */
	private toVideoInfo(
		item: YoutubePlaylistItem,
		redactedUrl: string
	): VideoInfo {
		const { snippet } = item;
		const videoId = snippet.resourceId.videoId;
		const publishedAt = dateTimeSerializer(
			DateTime.fromISO(snippet.publishedAt)
		);
		if (publishedAt === null) {
			logger.warn(
				`Youtube API returned an invalid publishedAt for video ${videoId}`
			);
			throw new RemoteApiErrorException('youtube', redactedUrl);
		}

		return {
			id: videoId,
			title: snippet.title,
			thumbnail: this.videoThumbnailUrlBuilder(videoId),
			description: snippet.description,
			url: `https://www.youtube.com/watch?v=${videoId}`,
			publishedAt,
		};
	}

	/**
	 * Builds the high-resolution thumbnail URL served by YouTube’s image CDN.
	 * @param videoId YouTube video identifier.
	 * @returns HTTPS URL pointing at maxresdefault.jpg.
	 */
	private videoThumbnailUrlBuilder(videoId: string): string {
		return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
	}

	/**
	 * Strips the `key` query parameter from a YouTube API request URL so it is safe to log
	 * or expose to the client (e.g. via the server error page).
	 * @param url Request URL containing the API key.
	 * @returns String form of the URL with the `key` parameter redacted.
	 */
	private redactApiKey(url: URL): string {
		const redacted = new URL(url.toString());
		redacted.searchParams.set('key', 'REDACTED');
		return redacted.toString();
	}
}
