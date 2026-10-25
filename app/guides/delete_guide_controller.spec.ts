import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

import { GuideFactory } from '#database/factories/guide_factory';
import { UserFactory } from '#database/factories/user_factory';
import Guide from '#models/guide';

test.group('DeleteGuideController', (group) => {
	group.each.setup(() => testUtils.db().wrapInGlobalTransaction());

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
