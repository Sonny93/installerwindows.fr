import { GithubService } from '#markdown/github_service';
import { NoCacheService } from '#tests/helpers/no_cache_service';

/**
 * GithubService double used by functional tests so no request ever reaches
 * raw.githubusercontent.com. Returns a fixed Markdown source, or throws when
 * constructed with an Error (used to exercise the remote-failure/500 path).
 * `toRawContentUrl` and `toBlobUrl` are kept from the real implementation
 * since they are pure and are exactly what several tests assert on.
 */
export class FakeGithubService extends GithubService {
	constructor(private readonly markdownOrError: string | Error) {
		super(new NoCacheService());
	}

	override async getHtmlFromUrl(): Promise<string> {
		if (this.markdownOrError instanceof Error) throw this.markdownOrError;
		return this.markdownOrError;
	}
}
