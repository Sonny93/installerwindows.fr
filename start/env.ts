/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env';

const nodeEnv = process.env.NODE_ENV;

export default await Env.create(new URL('../', import.meta.url), {
	NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
	PORT: Env.schema.number(),
	APP_KEY: Env.schema.string(),
	HOST: Env.schema.string({ format: 'host' }),
	LOG_LEVEL: Env.schema.string(),

	/*
|----------------------------------------------------------
| Variables for configuring session package
|----------------------------------------------------------
*/
	SESSION_DRIVER: Env.schema.enum(['cookie', 'memory'] as const),

	/*
|----------------------------------------------------------
| Variables for configuring database connection
|----------------------------------------------------------
*/
	DB_HOST: Env.schema.string({ format: 'host' }),
	DB_PORT: Env.schema.number(),
	DB_USER: Env.schema.string(),
	DB_PASSWORD: Env.schema.string.optional(),
	DB_DATABASE: Env.schema.string(),

	/*
|----------------------------------------------------------
| Variables for configuring youtube api
|----------------------------------------------------------
*/
	YOUTUBE_API_KEY: Env.schema.string(),
	YOUTUBE_PLAYLIST_ID: Env.schema.string(),

	/*
  |----------------------------------------------------------
  | Variables for configuring auth
  |----------------------------------------------------------
  */
	DISCORD_CLIENT_ID: Env.schema.string(),
	DISCORD_CLIENT_SECRET: Env.schema.string(),
	USERS_IDS: Env.schema.string(),

	/*
  |----------------------------------------------------------
  | Variables for configuring app url
  |----------------------------------------------------------
  */
	APP_URL: Env.schema.string({ format: 'url', tld: false }), // Remove TLD to allow localhost

	/*
  |----------------------------------------------------------
  | Variables for configuring umami
  |----------------------------------------------------------
  */
	UMAMI_URL: Env.schema.string.optionalWhen(nodeEnv === 'production'),
	UMAMI_WEBSITE_ID: Env.schema.string.optionalWhen(nodeEnv === 'production'),
});
