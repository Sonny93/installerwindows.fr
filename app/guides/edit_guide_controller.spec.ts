import { test } from '@japa/runner';
import testUtils from '@adonisjs/core/services/test_utils';

import Guide from '#models/guide';
import { UserFactory } from '#database/factories/user_factory';
import { GuideFactory } from '#database/factories/guide_factory';

test.group('EditGuideController', (group) => {
	group.each.setup(() => testUtils.db().withGlobalTransaction());

	test('should redirect an unauthenticated GET request to the login page', async ({
		client,
	}) => {
		const guide = await GuideFactory.create();

		const response = await client
			.get(`/guides/edit/${guide.slug}`)
			.accept('html')
			.redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', '/auth/login');
	});

	test('should render guides/edit_guide with the guide for an authenticated user', async ({
		client,
	}) => {
		const user = await UserFactory.create();
		const guide = await GuideFactory.create();

		const response = await client
			.get(`/guides/edit/${guide.slug}`)
			.loginAs(user)
			.withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('guides/edit_guide');
		response.assertInertiaPropsContains({ guide: { slug: guide.slug } });
	});

	test('should persist a valid update and redirect to the updated guide', async ({
		client,
		assert,
	}) => {
		const user = await UserFactory.create();
		const guide = await GuideFactory.create();

		const response = await client
			.put(`/guides/${guide.slug}`)
			.loginAs(user)
			.withCsrfToken()
			.accept('html')
			.redirects(0)
			.form({
				title: 'Updated Guide Title',
				thumbnail: 'https://example.com/updated-thumb.png',
				githubUrl: 'https://github.com/owner/repo/blob/main/UPDATED.md',
				slug: 'updated-guide-slug-test',
			});

		response.assertStatus(302);
		response.assertHeader('location', '/guides/updated-guide-slug-test');
		const updatedGuide = await Guide.findByOrFail(
			'slug',
			'updated-guide-slug-test'
		);
		assert.equal(updatedGuide.id, guide.id);
		assert.equal(
			updatedGuide.githubRawUrl,
			'https://raw.githubusercontent.com/owner/repo/main/UPDATED.md'
		);
	});

	test('should reject an invalid update and leave the guide untouched', async ({
		client,
		assert,
	}) => {
		const user = await UserFactory.create();
		const guide = await GuideFactory.create();

		const response = await client
			.put(`/guides/${guide.slug}`)
			.loginAs(user)
			.withCsrfToken()
			.accept('html')
			.redirects(0)
			.form({
				title: 'new',
				thumbnail: 'https://example.com/updated-thumb.png',
				githubUrl: 'https://github.com/owner/repo/blob/main/UPDATED.md',
				slug: 'should-not-be-applied',
			});

		response.assertStatus(302);
		assert.property(response.flashMessage('inputErrorsBag'), 'title');
		const untouchedGuide = await Guide.findByOrFail('id', guide.id);
		assert.equal(untouchedGuide.slug, guide.slug);
	});
});
