import adonisjs from '@adonisjs/vite/client';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		react(),
		UnoCSS(),
		adonisjs({
			entryPoints: ['inertia/app.tsx'],
			serverEntryPoints: ['inertia/ssr.tsx'],
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
