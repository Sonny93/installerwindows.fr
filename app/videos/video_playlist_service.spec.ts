import { test } from '@japa/runner';

import { makeVideoInfo } from '#tests/helpers/video_info_fixture';
import { VideoPlaylistService } from '#videos/video_playlist_service';
import { FakeYoutubeService } from '#tests/helpers/fake_youtube_service';
import EmptyPlaylistException from '#exceptions/empty_playlist_exception';

test.group('VideoPlaylistService.findVideo', () => {
	test('should return the first video as missing when videoId is undefined', async ({
		assert,
	}) => {
		const firstVideo = makeVideoInfo();
		const service = new VideoPlaylistService(
			new FakeYoutubeService([firstVideo, makeVideoInfo()])
		);

		const lookup = await service.findVideo(undefined);

		assert.deepEqual(lookup, { kind: 'missing', firstVideo });
	});

	test('should return the first video as missing when the id is unknown', async ({
		assert,
	}) => {
		const firstVideo = makeVideoInfo();
		const service = new VideoPlaylistService(
			new FakeYoutubeService([firstVideo, makeVideoInfo()])
		);

		const lookup = await service.findVideo('unknownVideoId');

		assert.deepEqual(lookup, { kind: 'missing', firstVideo });
	});

	test('should resolve the previous and next video for a middle video', async ({
		assert,
	}) => {
		const firstVideo = makeVideoInfo();
		const middleVideo = makeVideoInfo();
		const lastVideo = makeVideoInfo();
		const service = new VideoPlaylistService(
			new FakeYoutubeService([firstVideo, middleVideo, lastVideo])
		);

		const lookup = await service.findVideo(middleVideo.id);

		assert.deepEqual(lookup, {
			kind: 'found',
			videos: [firstVideo, middleVideo, lastVideo],
			currentVideo: middleVideo,
			previousVideo: firstVideo,
			nextVideo: lastVideo,
		});
	});

	test('should not resolve a previous video for the first video', async ({
		assert,
	}) => {
		const firstVideo = makeVideoInfo();
		const secondVideo = makeVideoInfo();
		const service = new VideoPlaylistService(
			new FakeYoutubeService([firstVideo, secondVideo])
		);

		const lookup = await service.findVideo(firstVideo.id);

		assert.isUndefined(
			lookup.kind === 'found' ? lookup.previousVideo : 'not found'
		);
	});

	test('should not resolve a next video for the last video', async ({
		assert,
	}) => {
		const firstVideo = makeVideoInfo();
		const lastVideo = makeVideoInfo();
		const service = new VideoPlaylistService(
			new FakeYoutubeService([firstVideo, lastVideo])
		);

		const lookup = await service.findVideo(lastVideo.id);

		assert.isUndefined(
			lookup.kind === 'found' ? lookup.nextVideo : 'not found'
		);
	});

	test('should throw EmptyPlaylistException when the playlist is empty', async ({
		assert,
	}) => {
		const service = new VideoPlaylistService(new FakeYoutubeService([]));

		await assert.rejects(
			() => service.findVideo(undefined),
			EmptyPlaylistException
		);
	});
});
