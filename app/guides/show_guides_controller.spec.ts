import { test } from '@japa/runner';
import testUtils from '@adonisjs/core/services/test_utils';

import { GuideFactory } from '#database/factories/guide_factory';

test.group('ShowGuidesController', (group) => {
	group.each.setup(() => testUtils.db().withGlobalTransaction());

	test('should list guides from the database', async ({ client, assert }) => {
		const guide = await GuideFactory.create();

		const response = await client.get('/guides').withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('guides/show_guides');
		const slugs = response.inertiaProps.guides.map(
			(persistedGuide: { slug: string }) => persistedGuide.slug
		);
		assert.include(slugs, guide.slug);
	});
});
