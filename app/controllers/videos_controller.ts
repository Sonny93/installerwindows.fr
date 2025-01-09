import { YoutubeService } from '#services/youtube_service';
import env from '#start/env';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class VideosController {
	#playlistId = env.get('YOUTUBE_PLAYLIST_ID');

	constructor(private youtubeService: YoutubeService) {}

	async index({ inertia }: HttpContext) {
		const videos = await this.youtubeService.getPlaylist(this.#playlistId);
		return inertia.render('videos', { videos });
	}
}
