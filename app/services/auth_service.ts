import { inject } from '@adonisjs/core';

import env from '#start/env';
import User from '#models/user';
import AuthenticationRefusedException from '#exceptions/authentication_refused_exception';

const DISCORD_PROVIDER_TYPE = 'discord';

export type DiscordProfile = {
	providerId: string;
	name: string;
	nickName: string | null;
	avatarUrl: string;
	token: unknown;
};

@inject()
export class AuthService {
	/**
	 * Rejects a Discord identity that is not part of the allow-listed user ids.
	 * @param providerId Discord user id returned by the OAuth provider.
	 */
	authorizeProviderId(providerId: string): void {
		const usersIds = env.get('USERS_IDS').split(',');
		if (!usersIds.includes(providerId)) {
			throw new AuthenticationRefusedException('Accès refusé');
		}
	}

	/**
	 * Creates or updates the local user record from the Discord OAuth profile.
	 * @param profile Profile extracted from the Discord OAuth provider.
	 * @returns Persisted user record.
	 */
	async upsertDiscordUser(profile: DiscordProfile): Promise<User> {
		return User.updateOrCreate(
			{ providerId: profile.providerId },
			{ ...profile, providerType: DISCORD_PROVIDER_TYPE }
		);
	}
}
