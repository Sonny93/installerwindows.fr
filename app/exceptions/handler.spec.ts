import app from '@adonisjs/core/services/app';
import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

import { GuideFactory } from '#database/factories/guide_factory';
import RemoteApiErrorException from '#exceptions/remote_api_error_exception';
import { CacheService } from '#markdown/cache_service';
import { GithubService } from '#markdown/github_service';
import env from '#start/env';
import { FakeGithubService } from '#tests/helpers/fake_github_service';
import { NoCacheService } from '#tests/helpers/no_cache_service';

test.group('HttpExceptionHandler - unknown route', () => {
	test('should render errors/not_found for a route that matches nothing', async ({
		client,
	}) => {
		const response = await client
			.get('/this-route-does-not-exist-at-all')
			.withInertia();

		response.assertStatus(404);
		response.assertInertiaComponent('errors/not_found');
	});
});

test.group('HttpExceptionHandler - remote API failures', (group) => {
	const originalFetch = globalThis.fetch;

	group.each.setup(() => testUtils.db().wrapInGlobalTransaction());

	group.each.teardown(() => {
		globalThis.fetch = originalFetch;
	});

	test('should render errors/server_error and never leak the real YOUTUBE_API_KEY when YouTube is unreachable', async ({
		client,
		cleanup,
		assert,
	}) => {
		// Neutralize the real cache so a value cached by an earlier test never
		// hides this failing fetch behind a cache hit.
		app.container.swap(CacheService, () => new NoCacheService());
		cleanup(() => app.container.restore(CacheService));
		globalThis.fetch = async () =>
			new Response('Internal Server Error', { status: 500 });

		const response = await client.get('/videos/fakeVideo01').withInertia();

		response.assertStatus(500);
		response.assertInertiaComponent('errors/server_error');
		assert.equal(response.inertiaProps.service, 'youtube');
		assert.notInclude(response.inertiaProps.link, env.get('YOUTUBE_API_KEY'));
	});

	test('should render errors/server_error with the service and link when GitHub is unreachable', async ({
		client,
		cleanup,
	}) => {
		const guide = await GuideFactory.create();
		const blobUrl = 'https://github.com/owner/repo/blob/main/README.md';
		app.container.swap(
			GithubService,
			() =>
				new FakeGithubService(new RemoteApiErrorException('github', blobUrl))
		);
		cleanup(() => app.container.restore(GithubService));

		const response = await client.get(`/guides/${guide.slug}`).withInertia();

		response.assertStatus(500);
		response.assertInertiaComponent('errors/server_error');
		response.assertInertiaPropsContains({ service: 'github', link: blobUrl });
	});
});
