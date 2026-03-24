import { configApp } from '@adonisjs/eslint-config';

export default configApp({
	name: 'Allow shared imports in inertia',
	files: ['inertia/**/*.{ts,tsx}'],
	rules: {
		'@adonisjs/no-backend-import-in-frontend': [
			'error',
			{
				allowed: ['#shared/*', '#shared/**'],
			},
		],
	},
});
