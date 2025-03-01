import { YoutubeService } from '#services/youtube_service';
import { videoValidator } from '#validators/video_validator';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class VideosController {
	constructor(private youtubeService: YoutubeService) {}

	async index({ request, inertia, response }: HttpContext) {
		const {
			params: { videoId },
		} = await request.validateUsing(videoValidator);

		const videos = await this.youtubeService.getPlaylist();
		const currentVideo = videos.find((v) => v.id === videoId);

		if (!currentVideo) {
			return response.redirect(`/videos/${videos[0].id}`);
		}

		const nextVideo = videos.at(videos.indexOf(currentVideo) + 1);
		return inertia.render(
			'videos',
			{ videos, currentVideo, nextVideo },
			{
				title: currentVideo.title,
				description: currentVideo.description,
			}
		);
	}
}
