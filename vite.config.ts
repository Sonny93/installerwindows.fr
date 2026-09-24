import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import adonisjs from '@adonisjs/vite/client';

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
