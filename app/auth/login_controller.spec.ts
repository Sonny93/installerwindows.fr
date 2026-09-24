import { test } from '@japa/runner';

test.group('LoginController', () => {
	test('should redirect to the Discord OAuth authorize URL', async ({
		client,
		assert,
	}) => {
		const response = await client.get('/auth/login').redirects(0);

		response.assertStatus(302);
		const location = response.header('location');
		assert.isTrue(location?.startsWith('https://discord.com/oauth2/authorize'));
	});
});
