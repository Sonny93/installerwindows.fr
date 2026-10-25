import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { showVideosValidator } from '#videos/validators/show_videos_validator';
import { VideoPlaylistService } from '#videos/video_playlist_service';
import VideoTransformer from '#videos/video_transformer';
import type { VideoInfo } from '#videos/youtube_service';

@inject()
export default class ShowVideosController {
	constructor(private readonly videoPlaylistService: VideoPlaylistService) {}

	async render({ request, inertia, response }: HttpContext) {
		const {
			params: { videoId },
		} = await request.validateUsing(showVideosValidator);

		const lookup = await this.videoPlaylistService.findVideo(videoId);

		if (lookup.kind === 'missing') {
			return response
				.redirect()
				.toRoute('videos.show_videos', { videoId: lookup.firstVideo.id });
		}

		const { videos, currentVideo, previousVideo, nextVideo } = lookup;
		return inertia.render(
			'videos/show_videos',
			{
				videos: VideoTransformer.transform(videos),
				currentVideo:
					VideoTransformer.transform(currentVideo).useVariant('forPlayer'),
				previousVideo: this.transformOptional(previousVideo),
				nextVideo: this.transformOptional(nextVideo),
			},
			{
				title: currentVideo.title,
				description: currentVideo.description,
			}
		);
	}

	/**
	 * Transforms an optional neighbouring video, keeping undefined as undefined
	 * instead of forcing every caller to repeat the same ternary.
	 * @param video Video to transform, or undefined when there is none.
	 * @returns The transformed video, or undefined.
	 */
	private transformOptional(video: VideoInfo | undefined) {
		return video ? VideoTransformer.transform(video) : undefined;
	}
}
