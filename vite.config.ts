import inertia from '@adonisjs/inertia/vite';
import adonisjs from '@adonisjs/vite/client';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		inertia({ ssr: { enabled: true, entrypoint: 'inertia/ssr.tsx' } }),
		react(),
		adonisjs({
			entrypoints: ['inertia/app.tsx'],
			reload: ['resources/views/**/*.edge'],
		}),
	],

	resolve: {
		alias: {
			'~/': `${import.meta.dirname}/inertia/`,
			'@generated': `${import.meta.dirname}/.adonisjs/client/`,
		},
	},
});
