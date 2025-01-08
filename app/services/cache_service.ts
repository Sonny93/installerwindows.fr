import cache from '@adonisjs/cache/services/main';
import { GetSetFactory } from '@adonisjs/cache/types';

export class CacheService {
	getOrSet({
		key,
		factory,
		ns,
		ttl,
	}: {
		key: string;
		factory: GetSetFactory;
		ns?: string;
		ttl?: number;
	}) {
		const cacheInstance = this.getCacheInstance(ns);
		return cacheInstance.getOrSet({
			key,
			factory,
			ttl,
		});
	}

	getCacheInstance(ns?: string) {
		return ns ? cache.namespace(ns) : cache;
	}
}
