import { test } from '@japa/runner';

test.group('DiscordCallbackController', () => {
	test('should flash "Accès refusé" and redirect home when the provider denies access', async ({
		client,
	}) => {
		const response = await client
			.get('/auth/callback')
			.qs({ error: 'access_denied' })
			.redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', '/');
		response.assertFlashMessage('flash', 'Accès refusé');
	});

	test('should flash "La requête a expiré" and redirect home on a state mismatch', async ({
		client,
	}) => {
		const response = await client
			.get('/auth/callback')
			.qs({ state: 'mismatched-state' })
			.redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', '/');
		response.assertFlashMessage('flash', 'La requête a expiré');
	});
});
