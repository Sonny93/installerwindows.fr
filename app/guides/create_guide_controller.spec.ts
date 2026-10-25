import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

import { UserFactory } from '#database/factories/user_factory';
import Guide from '#models/guide';

test.group('CreateGuideController', (group) => {
	group.each.setup(() => testUtils.db().wrapInGlobalTransaction());

	test('should redirect an unauthenticated GET request to the login page', async ({
		client,
	}) => {
		const response = await client
			.get('/guides/new')
			.accept('html')
			.redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', '/auth/login');
	});

	test('should redirect an unauthenticated POST request to the login page', async ({
		client,
	}) => {
		const response = await client
			.post('/guides/new')
			.withCsrfToken()
			.accept('html')
			.redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', '/auth/login');
	});

	test('should render guides/create_guide for an authenticated user', async ({
		client,
	}) => {
		const user = await UserFactory.create();

		const response = await client
			.get('/guides/new')
			.loginAs(user)
			.withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('guides/create_guide');
	});

	test('should persist a valid guide and redirect to its page', async ({
		client,
		assert,
	}) => {
		const user = await UserFactory.create();

		const response = await client
			.post('/guides/new')
			.loginAs(user)
			.withCsrfToken()
			.accept('html')
			.redirects(0)
			.form({
				title: 'My Brand New Guide',
				thumbnail: 'https://example.com/thumb.png',
				githubUrl: 'https://github.com/owner/repo/blob/main/README.md',
				slug: 'my-brand-new-guide-test',
			});

		response.assertStatus(302);
		response.assertHeader('location', '/guides/my-brand-new-guide-test');
		const guide = await Guide.findByOrFail('slug', 'my-brand-new-guide-test');
		assert.equal(
			guide.githubRawUrl,
			'https://raw.githubusercontent.com/owner/repo/main/README.md'
		);
	});

	test('should reject a forbidden title value and persist nothing', async ({
		client,
		assert,
	}) => {
		const user = await UserFactory.create();

		const response = await client
			.post('/guides/new')
			.loginAs(user)
			.withCsrfToken()
			.accept('html')
			.redirects(0)
			.form({
				title: 'new',
				thumbnail: 'https://example.com/thumb.png',
				githubUrl: 'https://github.com/owner/repo/blob/main/README.md',
				slug: 'forbidden-title-test',
			});

		response.assertStatus(302);
		assert.property(response.flashMessage('inputErrorsBag'), 'title');
		assert.isNull(await Guide.findBy('slug', 'forbidden-title-test'));
	});

	test('should reject a non-GitHub URL and persist nothing', async ({
		client,
		assert,
	}) => {
		const user = await UserFactory.create();

		const response = await client
			.post('/guides/new')
			.loginAs(user)
			.withCsrfToken()
			.accept('html')
			.redirects(0)
			.form({
				title: 'Guide With A Bad URL',
				thumbnail: 'https://example.com/thumb.png',
				githubUrl: 'https://example.com/not-github',
				slug: 'bad-url-test',
			});

		response.assertStatus(302);
		assert.property(response.flashMessage('inputErrorsBag'), 'githubUrl');
		assert.isNull(await Guide.findBy('slug', 'bad-url-test'));
	});

	test('should reject a missing title and persist nothing', async ({
		client,
		assert,
	}) => {
		const user = await UserFactory.create();

		const response = await client
			.post('/guides/new')
			.loginAs(user)
			.withCsrfToken()
			.accept('html')
			.redirects(0)
			.form({
				thumbnail: 'https://example.com/thumb.png',
				githubUrl: 'https://github.com/owner/repo/blob/main/README.md',
				slug: 'missing-title-test',
			});

		response.assertStatus(302);
		assert.property(response.flashMessage('inputErrorsBag'), 'title');
		assert.isNull(await Guide.findBy('slug', 'missing-title-test'));
	});
});
