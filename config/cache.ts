import { defineConfig, drivers, store } from '@adonisjs/cache';

const cacheConfig = defineConfig({
	default: 'database',
	stores: {
		database: store()
			.useL1Layer(drivers.memory())
			.useL2Layer(
				drivers.database({
					connectionName: 'postgres',
				})
			),
	},
});

export default cacheConfig;

declare module '@adonisjs/cache/types' {
	interface CacheStores extends InferStores<typeof cacheConfig> {}
}
