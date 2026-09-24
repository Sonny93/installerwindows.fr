import { CacheService } from '#markdown/cache_service';

/**
 * A GetSetFactoryContext whose members are all no-ops: the real bentocache
 * pipeline is the only caller that needs to call `setTtl`, `setOptions`,
 * `setTags`, `fail`, or read `gracedEntry`, none of which the app's
 * factories (GithubService, YoutubeService) use.
 */
const noopFactoryContext = {
	setTtl: () => {},
	setOptions: () => {},
	setTags: () => {},
	fail: () => {},
	skip: () => undefined,
	gracedEntry: undefined,
};

/**
 * Cache service double that always runs the factory directly instead of
 * reading or writing the real Adonis cache (in-memory L1 + Postgres L2).
 * Used to keep tests deterministic: without it, a value cached by one test
 * would leak into the next since the L1 memory layer is a process-wide
 * singleton that a rolled-back database transaction cannot reset.
 */
export class NoCacheService extends CacheService {
	override getOrSet({ factory }: Parameters<CacheService['getOrSet']>[0]) {
		return factory(noopFactoryContext);
	}
}
