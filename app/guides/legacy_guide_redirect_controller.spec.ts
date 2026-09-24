import { test } from '@japa/runner';

test.group('LegacyGuideRedirectController', () => {
	test('should redirect /guide/:slug to /guides/:slug', async ({ client }) => {
		const response = await client.get('/guide/some-guide-slug').redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', '/guides/some-guide-slug');
	});
});
