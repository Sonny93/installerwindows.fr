import { defineConfig } from '@adonisjs/inertia';
import type { InferSharedProps, PageProps } from '@adonisjs/inertia/types';

const inertiaConfig = defineConfig({
	/**
	 * Path to the Edge view that will be used as the root view for Inertia responses
	 */
	rootView: 'inertia_layout',

	/**
	 * Data that should be shared with all rendered pages
	 */
	sharedData: {
		flash: (ctx) =>
			ctx.inertia.always(() => ctx.session?.flashMessages.get('flash')),
		auth: (ctx) =>
			ctx.inertia.always(async () => {
				await ctx.auth?.check();
				return {
					user: ctx.auth?.user || null,
					isAuthenticated: ctx.auth?.isAuthenticated || false,
				};
			}),
	},

	/**
	 * Options for the server-side rendering
	 */
	ssr: {
		enabled: true,
		entrypoint: 'inertia/app/ssr.tsx',
	},
});

export default inertiaConfig;

declare module '@adonisjs/inertia/types' {
	export interface SharedProps
		extends InferSharedProps<typeof inertiaConfig>, PageProps {}
}
