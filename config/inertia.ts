import { defineConfig } from '@adonisjs/inertia';

const inertiaConfig = defineConfig({
	rootView: 'inertia_layout',
	encryptHistory: true,
	ssr: {
		enabled: true,
		entrypoint: 'inertia/ssr.tsx',
	},
});

export default inertiaConfig;
