import { test } from '@japa/runner';
import app from '@adonisjs/core/services/app';

import { YoutubeService } from '#videos/youtube_service';
import { makeVideoInfo } from '#tests/helpers/video_info_fixture';
import { FakeYoutubeService } from '#tests/helpers/fake_youtube_service';

test.group('ShowVideosController', () => {
	test('should redirect /videos to the first video of the playlist', async ({
		client,
		cleanup,
	}) => {
		const firstVideo = makeVideoInfo();
		app.container.swap(
			YoutubeService,
			() => new FakeYoutubeService([firstVideo, makeVideoInfo()])
		);
		cleanup(() => app.container.restore(YoutubeService));

		const response = await client.get('/videos').redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', `/videos/${firstVideo.id}`);
	});

	test('should render videos/show_videos with the current and next video', async ({
		client,
		cleanup,
	}) => {
		const firstVideo = makeVideoInfo();
		const secondVideo = makeVideoInfo();
		app.container.swap(
			YoutubeService,
			() => new FakeYoutubeService([firstVideo, secondVideo])
		);
		cleanup(() => app.container.restore(YoutubeService));

		const response = await client.get(`/videos/${firstVideo.id}`).withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('videos/show_videos');
		response.assertInertiaPropsContains({
			currentVideo: { id: firstVideo.id },
			nextVideo: { id: secondVideo.id },
		});
	});

	test('should not include a next video when rendering the last video of the playlist', async ({
		client,
		cleanup,
		assert,
	}) => {
		const firstVideo = makeVideoInfo();
		const lastVideo = makeVideoInfo();
		app.container.swap(
			YoutubeService,
			() => new FakeYoutubeService([firstVideo, lastVideo])
		);
		cleanup(() => app.container.restore(YoutubeService));

		const response = await client.get(`/videos/${lastVideo.id}`).withInertia();

		response.assertStatus(200);
		response.assertInertiaPropsContains({ currentVideo: { id: lastVideo.id } });
		assert.isUndefined(response.inertiaProps.nextVideo);
	});

	test('should redirect to the first video when the id is well-formed but unknown', async ({
		client,
		cleanup,
	}) => {
		const firstVideo = makeVideoInfo();
		app.container.swap(
			YoutubeService,
			() => new FakeYoutubeService([firstVideo])
		);
		cleanup(() => app.container.restore(YoutubeService));

		const response = await client.get('/videos/unknownVid1').redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', `/videos/${firstVideo.id}`);
	});

	test('should redirect back with a validation error when the video id is malformed', async ({
		client,
		assert,
	}) => {
		const response = await client.get('/videos/x').accept('html').redirects(0);

		response.assertStatus(302);
		// The field path is a literal "params.videoId" key, not a nested one,
		// so plain property lookup is used instead of assert.property's
		// dot-path traversal.
		assert.isDefined(response.flashMessage('inputErrorsBag')['params.videoId']);
	});
});
