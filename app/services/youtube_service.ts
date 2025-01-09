import { CacheService } from '#services/cache_service';
import { Videos } from '#shared/types/index';
import env from '#start/env';
import { inject } from '@adonisjs/core';

interface VideoInfo {
	title: string;
	thumbnail: string;
	description: string;
	url: string;
}

@inject()
export class YoutubeService {
	private apiKey: string = env.get('YOUTUBE_API_KEY');
	private apiUrl: string = `https://www.googleapis.com/youtube/v3/playlistItems`;

	constructor(private cacheService: CacheService) {}

	/**
	 * Fetches videos from a YouTube playlist, leveraging caching for optimization.
	 * @param playlistId The ID of the YouTube playlist.
	 * @returns A list of videos with their details.
	 */
	async getPlaylist(playlistId: string): Promise<Videos> {
		const videos = await this.cacheService.getOrSet({
			ns: 'youtube',
			key: playlistId,
			factory: async () => this.fetchPlaylist(playlistId),
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
			throw new Error(`Failed to fetch playlist data: ${response.statusText}`);
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
