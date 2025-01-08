import { CacheService } from '#services/cache_service';
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

	async getRawUrlFromGithubUrl(url: string) {
		const isRaw = url.includes('raw.githubusercontent.com');
		const isGithubFile = url.includes('github.com');

		if (!isRaw && !isGithubFile) {
			throw new Error('Invalid Github URL');
		}

		if (isRaw) {
			return url;
		}

		return url.replace('github.com', 'raw.githubusercontent.com');
	}

	protected async getRawContentFromUrl(url: string) {
		const rawUrl = await this.getRawUrlFromGithubUrl(url);
		const response = await fetch(rawUrl);
		return response.text();
	}
}
