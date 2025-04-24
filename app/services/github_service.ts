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
	constructor(private cacheService: CacheService) {}

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
