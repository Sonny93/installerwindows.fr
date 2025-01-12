import { CacheService } from '#services/cache_service';
import { getGithubRawUrl } from '#shared/utils/index';
import { inject } from '@adonisjs/core';

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
		const rawUrl = getGithubRawUrl(url);
		const response = await fetch(rawUrl);
		return response.text();
	}
}
