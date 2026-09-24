import { test } from '@japa/runner';
import app from '@adonisjs/core/services/app';

import { GithubService } from '#markdown/github_service';
import { YoutubeService } from '#videos/youtube_service';
import { FakeGithubService } from '#tests/helpers/fake_github_service';
import { FakeYoutubeService } from '#tests/helpers/fake_youtube_service';

test.group('ShowHomeController', () => {
	test('should render home/show_home with html derived from the GitHub markdown', async ({
		client,
		cleanup,
		assert,
	}) => {
		app.container.swap(
			GithubService,
			() => new FakeGithubService('# Bienvenue\n\nContenu de test.')
		);
		app.container.swap(YoutubeService, () => new FakeYoutubeService([]));
		cleanup(() => {
			app.container.restore(GithubService);
			app.container.restore(YoutubeService);
		});

		const response = await client.get('/').withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('home/show_home');
		assert.include(response.inertiaProps.html, '<h1>Bienvenue</h1>');
	});
});
