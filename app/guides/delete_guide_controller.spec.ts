import { test } from '@japa/runner';
import testUtils from '@adonisjs/core/services/test_utils';

import Guide from '#models/guide';
import { UserFactory } from '#database/factories/user_factory';
import { GuideFactory } from '#database/factories/guide_factory';

test.group('DeleteGuideController', (group) => {
	group.each.setup(() => testUtils.db().withGlobalTransaction());

	test('should redirect an unauthenticated request to the login page', async ({
		client,
	}) => {
		const guide = await GuideFactory.create();

		const response = await client
			.delete(`/guides/${guide.slug}`)
			.withCsrfToken()
			.accept('html')
			.redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', '/auth/login');
	});

	test('should delete the guide and redirect to the guides list', async ({
		client,
		assert,
	}) => {
		const user = await UserFactory.create();
		const guide = await GuideFactory.create();

		const response = await client
			.delete(`/guides/${guide.slug}`)
			.loginAs(user)
			.withCsrfToken()
			.accept('html')
			.redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', '/guides');
		assert.isNull(await Guide.find(guide.id));
	});
});
