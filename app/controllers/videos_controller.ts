import { YoutubeService } from '#services/youtube_service';
import env from '#start/env';
import { videoValidator } from '#validators/video_validator';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class VideosController {
	#playlistId = env.get('YOUTUBE_PLAYLIST_ID');

	constructor(private youtubeService: YoutubeService) {}

	async index({ request, inertia, response }: HttpContext) {
		const {
			params: { videoId },
		} = await request.validateUsing(videoValidator);

		const videos = await this.youtubeService.getPlaylist(this.#playlistId);
		const currentVideo = videos.find((v) => v.id === videoId);

		if (!currentVideo) {
			return response.redirect(`/videos/${videos[0].id}`);
		}

		return inertia.render(
			'videos',
			{ videos, currentVideo },
			{
				title: currentVideo.title,
				description: currentVideo.description,
			}
		);
	}
}
