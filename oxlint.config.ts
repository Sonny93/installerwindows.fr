import { defineConfig } from 'oxlint';
import {
	ADONISJS_DEFAULT_IGNORE_PATTERNS,
	minimalstuffPreset,
} from '@minimalstuff/tooling/oxc/lint';

export default defineConfig({
	ignorePatterns: [...ADONISJS_DEFAULT_IGNORE_PATTERNS, 'database/schema.ts'],
	extends: [minimalstuffPreset({ adonisjs: true, react: true })],
	overrides: [
		{
			files: ['inertia/**/*.{ts,tsx}'],
			rules: {
				'@adonisjs/no-backend-import-in-frontend': [
					'error',
					{ allowed: ['#shared/*', '#shared/**'] },
				],
			},
		},
	],
});
