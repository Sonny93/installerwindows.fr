import cache from '@adonisjs/cache/services/main';
import type { GetSetFactory } from '@adonisjs/cache/types';

export class CacheService {
	/**
	 * Reads a cache entry or populates it by running the factory when the key is missing.
	 * @param options.key Unique key for the cache entry.
	 * @param options.factory Async function that produces the value when the cache is empty.
	 * @param options.ns Optional Adonis cache namespace.
	 * @param options.ttl Optional time-to-live for the entry, in seconds.
	 * @returns Cached or newly computed value.
	 */
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

	/**
	 * Returns the global cache instance or the one for the given namespace.
	 * @param namespace Optional namespace; when omitted, the root cache is used.
	 * @returns Cache instance ready for getOrSet and other operations.
	 */
	getCacheInstance(namespace?: string) {
		return namespace ? cache.namespace(namespace) : cache;
	}
}
