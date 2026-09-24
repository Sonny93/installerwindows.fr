import { test } from '@japa/runner';
import app from '@adonisjs/core/services/app';

import { YoutubeService } from '#videos/youtube_service';
import { FakeYoutubeService } from '#tests/helpers/fake_youtube_service';

test.group('ShowCguController', () => {
	test('should render cgu/show_cgu with a non-empty table of contents', async ({
		client,
		cleanup,
		assert,
	}) => {
		app.container.swap(YoutubeService, () => new FakeYoutubeService([]));
		cleanup(() => app.container.restore(YoutubeService));

		const response = await client.get('/cgu').withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('cgu/show_cgu');
		assert.isAbove(response.inertiaProps.toc.length, 0);
	});
});
