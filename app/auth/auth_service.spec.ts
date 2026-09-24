import { test } from '@japa/runner';

import { AuthService } from '#auth/auth_service';
import AuthenticationRefusedException from '#exceptions/authentication_refused_exception';

test.group('AuthService.authorizeProviderId', () => {
	test('should not throw when the provider id is allow-listed in USERS_IDS', ({
		assert,
	}) => {
		const authService = new AuthService();

		assert.doesNotThrow(() =>
			authService.authorizeProviderId('257285655388880896')
		);
	});

	test('should throw AuthenticationRefusedException when the provider id is not allow-listed', ({
		assert,
	}) => {
		const authService = new AuthService();

		assert.throws(
			() => authService.authorizeProviderId('unknown-discord-id'),
			AuthenticationRefusedException
		);
	});
});
