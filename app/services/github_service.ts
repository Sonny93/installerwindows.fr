import RemoteApiErrorException from '#exceptions/remote_api_error_exception';
import { CacheService } from '#services/cache_service';
import {
	transformRawToGithubUrl,
	validateAndTransformMarkdownUrl,
} from '#shared/utils/index';
import { inject } from '@adonisjs/core';
import logger from '@adonisjs/core/services/logger';
@inject()
export class GithubService {
	constructor(private readonly cacheService: CacheService) {}

	/**
	 * Returns the raw content for a repository or file GitHub URL, either loading it or reusing a cached value.
	 * @param url Guide or Markdown file URL on GitHub.
	 * @returns Raw text (Markdown) returned by the raw URL.
	 */
	async getHtmlFromUrl(url: string) {
		const cachedHtml = await this.cacheService.getOrSet({
			ns: 'github',
			key: url,
			factory: async () => {
				const rawContent = await this.getRawContentFromUrl(url);
				return rawContent;
			},
		});

		return cachedHtml;
	}

	/**
	 * Sends an HTTP request to the raw URL derived from the given link and returns the response body as text.
	 * @param url URL to normalize and turn into a GitHub raw link.
	 * @throws RemoteApiErrorException when the HTTP response is not successful.
	 * @returns Response body as plain text.
	 */
	protected async getRawContentFromUrl(url: string) {
		const rawUrl = validateAndTransformMarkdownUrl(url);
		const response = await fetch(rawUrl);
		if (!response.ok) {
			logger.debug('Github API error ' + (await response.text()));
			const guideUrl = transformRawToGithubUrl(url);
			throw new RemoteApiErrorException('github', guideUrl);
		}
		return response.text();
	}
}
