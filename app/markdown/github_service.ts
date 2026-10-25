import { inject } from '@adonisjs/core';
import logger from '@adonisjs/core/services/logger';

import InvalidGithubMarkdownUrlException from '#exceptions/invalid_github_markdown_url_exception';
import RemoteApiErrorException from '#exceptions/remote_api_error_exception';
import { CacheService } from '#markdown/cache_service';

const githubRepoRegex =
	/^https?:\/\/(www\.)?github\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)\/blob\/(?<branch>[^/]+)\/(?<path>.+\.md)$/;
const rawContentRegex =
	/^https?:\/\/(www\.)?raw\.githubusercontent\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)\/(?<branch>[^/]+)\/(?<path>.+\.md)$/;

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
	 * Normalizes a GitHub blob or raw-content URL into a raw-content URL.
	 * @param url Guide or Markdown file URL on GitHub.
	 * @throws InvalidGithubMarkdownUrlException when the URL is not a valid GitHub markdown file.
	 * @returns Raw-content URL for the given file.
	 */
	toRawContentUrl(url: string): string {
		const githubMatch = url.match(githubRepoRegex);
		if (githubMatch?.groups) {
			const { owner, repo, branch, path } = githubMatch.groups;
			return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
		}

		if (rawContentRegex.test(url)) {
			return url;
		}

		throw new InvalidGithubMarkdownUrlException(
			"L'URL fournie n'est pas un fichier markdown GitHub valide."
		);
	}

	/**
	 * Normalizes a GitHub raw-content or blob URL into a blob URL.
	 * @param url Raw-content or blob URL on GitHub.
	 * @throws InvalidGithubMarkdownUrlException when the URL is not a valid GitHub file.
	 * @returns Blob URL for the given file.
	 */
	toBlobUrl(url: string): string {
		const rawMatch = url.match(rawContentRegex);
		if (rawMatch?.groups) {
			const { owner, repo, branch, path } = rawMatch.groups;
			return `https://github.com/${owner}/${repo}/blob/${branch}/${path}`;
		}

		if (githubRepoRegex.test(url)) {
			return url;
		}

		throw new InvalidGithubMarkdownUrlException(
			"L'URL fournie n'est pas un fichier GitHub valide."
		);
	}

	/**
	 * Sends an HTTP request to the raw URL derived from the given link and returns the response body as text.
	 * @param url URL to normalize and turn into a GitHub raw link.
	 * @throws RemoteApiErrorException when the HTTP response is not successful.
	 * @returns Response body as plain text.
	 */
	protected async getRawContentFromUrl(url: string) {
		const rawUrl = this.toRawContentUrl(url);
		const response = await fetch(rawUrl);
		if (!response.ok) {
			logger.debug('Github API error ' + (await response.text()));
			const guideUrl = this.toBlobUrl(url);
			throw new RemoteApiErrorException('github', guideUrl);
		}
		return response.text();
	}
}
