import { inject } from '@adonisjs/core';

import EmptyPlaylistException from '#exceptions/empty_playlist_exception';
import { YoutubeService } from '#videos/youtube_service';
import type { VideoInfo } from '#videos/youtube_service';

export type PlaylistLookup =
	| {
			kind: 'found';
			videos: VideoInfo[];
			currentVideo: VideoInfo;
			previousVideo: VideoInfo | undefined;
			nextVideo: VideoInfo | undefined;
	  }
	| { kind: 'missing'; firstVideo: VideoInfo };

@inject()
export class VideoPlaylistService {
	constructor(private readonly youtubeService: YoutubeService) {}

	/**
	 * Locates a video within the playlist by id, along with its previous and next neighbours.
	 * @param videoId Identifier of the video to locate, or undefined to request the first video.
	 * @throws EmptyPlaylistException when the playlist has no video at all.
	 * @returns The located video with its neighbours, or the playlist's first video when the id is missing or unknown.
	 */
	async findVideo(videoId: string | undefined): Promise<PlaylistLookup> {
		const videos = await this.youtubeService.getPlaylist();
		const firstVideo = videos.at(0);
		if (firstVideo === undefined) throw new EmptyPlaylistException();

		const currentVideo = videos.find((video) => video.id === videoId);
		if (currentVideo === undefined) return { kind: 'missing', firstVideo };

		return {
			kind: 'found',
			videos,
			currentVideo,
			...this.neighboursOf(videos, currentVideo),
		};
	}

	/**
	 * Resolves the video immediately before and after the given video in the playlist.
	 * @param videos Full playlist, in order.
	 * @param currentVideo Video whose neighbours are being resolved.
	 * @returns The previous and next video, undefined at either end of the playlist.
	 */
	private neighboursOf(
		videos: VideoInfo[],
		currentVideo: VideoInfo
	): {
		previousVideo: VideoInfo | undefined;
		nextVideo: VideoInfo | undefined;
	} {
		const currentIndex = videos.indexOf(currentVideo);

		return {
			previousVideo: currentIndex > 0 ? videos[currentIndex - 1] : undefined,
			nextVideo: videos.at(currentIndex + 1),
		};
	}
}
