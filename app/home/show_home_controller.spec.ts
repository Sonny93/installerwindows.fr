import { test } from '@japa/runner';

test.group('ShowHomeController', () => {
	test('should render home/show_home', async ({ client }) => {
		const response = await client.get('/').withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('home/show_home');
	});
});
