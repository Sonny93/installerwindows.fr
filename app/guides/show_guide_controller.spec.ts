import { test } from '@japa/runner';
import app from '@adonisjs/core/services/app';
import testUtils from '@adonisjs/core/services/test_utils';

import { GithubService } from '#markdown/github_service';
import { YoutubeService } from '#videos/youtube_service';
import { GuideFactory } from '#database/factories/guide_factory';
import { FakeGithubService } from '#tests/helpers/fake_github_service';
import { FakeYoutubeService } from '#tests/helpers/fake_youtube_service';

test.group('ShowGuideController', (group) => {
	group.each.setup(() => testUtils.db().withGlobalTransaction());

	test('should render guides/show_guide with a githubUrl derived from the stored raw URL', async ({
		client,
		cleanup,
	}) => {
		const guide = await GuideFactory.merge({
			githubRawUrl:
				'https://raw.githubusercontent.com/owner/repo/main/README.md',
		}).create();
		app.container.swap(
			GithubService,
			() => new FakeGithubService('# Guide content')
		);
		app.container.swap(YoutubeService, () => new FakeYoutubeService([]));
		cleanup(() => {
			app.container.restore(GithubService);
			app.container.restore(YoutubeService);
		});

		const response = await client.get(`/guides/${guide.slug}`).withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('guides/show_guide');
		response.assertInertiaPropsContains({
			githubUrl: 'https://github.com/owner/repo/blob/main/README.md',
			slug: guide.slug,
		});
	});

	test('should render errors/not_found for an unknown slug', async ({
		client,
	}) => {
		const response = await client
			.get('/guides/this-slug-does-not-exist')
			.withInertia();

		response.assertStatus(404);
		response.assertInertiaComponent('errors/not_found');
	});
});
