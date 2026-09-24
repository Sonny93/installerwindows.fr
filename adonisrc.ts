import { indexEntities } from '@adonisjs/core';
import { indexPages } from '@adonisjs/inertia';
import { defineConfig } from '@adonisjs/core/app';
import { generateRegistry } from '@tuyau/core/hooks';

export default defineConfig({
	/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| List of ace commands to register from packages. The application commands
| will be scanned automatically from the "./commands" directory.
|
*/
	commands: [
		() => import('@adonisjs/core/commands'),
		() => import('@adonisjs/lucid/commands'),
		() => import('@adonisjs/cache/commands'),
	],

	/*
|--------------------------------------------------------------------------
| Service providers
|--------------------------------------------------------------------------
|
| List of service providers to import and register when booting the
| application
|
*/
	providers: [
		() => import('@adonisjs/core/providers/app_provider'),
		() => import('@adonisjs/core/providers/hash_provider'),
		{
			file: () => import('@adonisjs/core/providers/repl_provider'),
			environment: ['repl', 'test'],
		},
		() => import('@adonisjs/core/providers/vinejs_provider'),
		() => import('@adonisjs/core/providers/edge_provider'),
		() => import('@adonisjs/session/session_provider'),
		() => import('@adonisjs/vite/vite_provider'),
		() => import('@adonisjs/shield/shield_provider'),
		() => import('@adonisjs/static/static_provider'),
		() => import('@adonisjs/cors/cors_provider'),
		() => import('@adonisjs/lucid/database_provider'),
		() => import('@adonisjs/auth/auth_provider'),
		() => import('@adonisjs/inertia/inertia_provider'),
		() => import('@adonisjs/cache/cache_provider'),
		() => import('@adonisjs/ally/ally_provider'),
	],

	/*
|--------------------------------------------------------------------------
| Preloads
|--------------------------------------------------------------------------
|
| List of modules to import before starting the application.
|
*/
	preloads: [
		() => import('#start/routes'),
		() => import('#start/kernel'),
		() => import('#start/validator'),
		() => import('#start/view'),
	],

	/*
|--------------------------------------------------------------------------
| Tests
|--------------------------------------------------------------------------
|
| List of test suites to organize tests by their type. Feel free to remove
| and add additional suites.
|
*/
	tests: {
		suites: [
			{
				// No HTTP server. Role-based globs, disjoint from the functional suite by construction.
				files: [
					'app/**/*_service.spec.ts',
					'app/libs/**/*.spec.ts',
					'app/**/*_transformer.spec.ts',
					'app/**/validators/**/*.spec.ts',
				],
				name: 'unit',
				timeout: 2000,
			},
			{
				// Boots the HTTP server and exercises real routes end to end.
				files: [
					'app/**/*_controller.spec.ts',
					'app/exceptions/**/*.spec.ts',
					'app/middleware/**/*.spec.ts',
				],
				name: 'functional',
				timeout: 30000,
			},
		],
		forceExit: true,
	},

	/*
|--------------------------------------------------------------------------
| Metafiles
|--------------------------------------------------------------------------
|
| A collection of files you want to copy to the build folder when creating
| the production build.
|
*/
	metaFiles: [
		{
			pattern: 'resources/views/**/*.edge',
			reloadServer: false,
		},
		{
			pattern: 'public/**',
			reloadServer: false,
		},
	],

	hooks: {
		init: [
			indexEntities({
				controllers: {
					source: 'app',
					glob: ['**/*_controller.ts'],
					importAlias: undefined,
				},
				transformers: {
					enabled: true,
					withSharedProps: true,
					source: 'app',
					glob: ['**/*_transformer.ts'],
					importAlias: undefined,
					skipSegments: [
						'guides',
						'videos',
						'auth',
						'home',
						'cgu',
						'status',
						'markdown',
					],
				},
			}),
			indexPages({ framework: 'react' }),
			generateRegistry(),
		],
		buildStarting: [() => import('@adonisjs/vite/build_hook')],
	},
});
