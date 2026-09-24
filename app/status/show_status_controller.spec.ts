import { test } from '@japa/runner';

test.group('ShowStatusController', () => {
	test('should render status/show_status with a healthy status', async ({
		client,
		assert,
	}) => {
		const response = await client.get('/status').withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('status/show_status');
		assert.isTrue(response.inertiaProps.status);
	});
});
