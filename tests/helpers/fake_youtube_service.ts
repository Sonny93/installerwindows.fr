import { NoCacheService } from '#tests/helpers/no_cache_service';
import { YoutubeService } from '#videos/youtube_service';
import type { VideoInfo } from '#videos/youtube_service';

/**
 * YoutubeService double used by functional tests so no request ever reaches
 * the YouTube Data API. Returns a fixed video list, or throws when
 * constructed with an Error (used to exercise the remote-failure/500 path).
 */
export class FakeYoutubeService extends YoutubeService {
	constructor(private readonly videosOrError: VideoInfo[] | Error) {
		super(new NoCacheService());
	}

	override async getPlaylist(): Promise<VideoInfo[]> {
		if (this.videosOrError instanceof Error) throw this.videosOrError;
		return this.videosOrError;
	}
}
