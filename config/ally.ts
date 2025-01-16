import env from '#start/env';
import { defineConfig, services } from '@adonisjs/ally';

const allyConfig = defineConfig({
	discord: services.discord({
		clientId: env.get('DISCORD_CLIENT_ID'),
		clientSecret: env.get('DISCORD_CLIENT_SECRET'),
		callbackUrl: env.get('APP_URL') + '/auth/callback',
		scopes: ['identify'],
	}),
});

export default allyConfig;

declare module '@adonisjs/ally/types' {
	interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
