import { test } from '@japa/runner';
import testUtils from '@adonisjs/core/services/test_utils';

import { UserFactory } from '#database/factories/user_factory';

test.group('LogoutController', (group) => {
	group.each.setup(() => testUtils.db().withGlobalTransaction());

	test('should return 404 for GET /auth/logout since only POST is registered', async ({
		client,
	}) => {
		const response = await client.get('/auth/logout').withInertia();

		response.assertStatus(404);
		response.assertInertiaComponent('errors/not_found');
	});

	test('should not log the user out when the CSRF token is missing', async ({
		client,
	}) => {
		const user = await UserFactory.create();

		// Shield's CSRF guard self-handles E_BAD_CSRF_TOKEN with a redirect back
		// (always 302, regardless of content negotiation), so the request never
		// reaches LogoutController.execute(); the flashed "error" key is what
		// distinguishes this from a successful logout, which flashes nothing.
		const response = await client
			.post('/auth/logout')
			.loginAs(user)
			.redirects(0);

		response.assertStatus(302);
		response.assertFlashMessage('error');
	});

	test('should log the user out and redirect home when the CSRF token is valid', async ({
		client,
	}) => {
		const user = await UserFactory.create();

		const response = await client
			.post('/auth/logout')
			.loginAs(user)
			.withCsrfToken()
			.accept('html')
			.redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', '/');
	});
});
