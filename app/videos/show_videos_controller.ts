import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { YoutubeService } from '#videos/youtube_service';
import VideoTransformer from '#videos/video_transformer';
import { showVideosValidator } from '#videos/validators/show_videos_validator';

@inject()
export default class ShowVideosController {
	constructor(private readonly youtubeService: YoutubeService) {}

	async render({ request, inertia, response }: HttpContext) {
		const {
			params: { videoId },
		} = await request.validateUsing(showVideosValidator);

		const videos = await this.youtubeService.getPlaylist();
		const currentVideo = videos.find((v) => v.id === videoId);

		if (!currentVideo) {
			return response
				.redirect()
				.toRoute('videos.show_videos', { videoId: videos[0].id });
		}

		const nextVideo = videos.at(videos.indexOf(currentVideo) + 1);
		return inertia.render(
			'videos/show_videos',
			{
				videos: VideoTransformer.transform(videos),
				currentVideo: VideoTransformer.transform(currentVideo),
				nextVideo: nextVideo
					? VideoTransformer.transform(nextVideo)
					: undefined,
			},
			{
				title: currentVideo.title,
				description: currentVideo.description,
			}
		);
	}
}
