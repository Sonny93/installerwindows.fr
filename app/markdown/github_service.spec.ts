import { test } from '@japa/runner';

import { GithubService } from '#markdown/github_service';
import { NoCacheService } from '#tests/helpers/no_cache_service';
import InvalidGithubMarkdownUrlException from '#exceptions/invalid_github_markdown_url_exception';

const blobUrl = 'https://github.com/owner/repo/blob/main/path/to/file.md';
const rawUrl =
	'https://raw.githubusercontent.com/owner/repo/main/path/to/file.md';

test.group('GithubService.toRawContentUrl', () => {
	test('should convert a blob URL to its raw-content URL', ({ assert }) => {
		const githubService = new GithubService(new NoCacheService());

		assert.equal(githubService.toRawContentUrl(blobUrl), rawUrl);
	});

	test('should return a raw-content URL unchanged', ({ assert }) => {
		const githubService = new GithubService(new NoCacheService());

		assert.equal(githubService.toRawContentUrl(rawUrl), rawUrl);
	});

	test('should throw InvalidGithubMarkdownUrlException for a non-GitHub markdown URL', ({
		assert,
	}) => {
		const githubService = new GithubService(new NoCacheService());

		assert.throws(
			() => githubService.toRawContentUrl('https://example.com/not-github.md'),
			InvalidGithubMarkdownUrlException
		);
	});
});

test.group('GithubService.toBlobUrl', () => {
	test('should convert a raw-content URL to its blob URL', ({ assert }) => {
		const githubService = new GithubService(new NoCacheService());

		assert.equal(githubService.toBlobUrl(rawUrl), blobUrl);
	});

	test('should return a blob URL unchanged', ({ assert }) => {
		const githubService = new GithubService(new NoCacheService());

		assert.equal(githubService.toBlobUrl(blobUrl), blobUrl);
	});

	test('should throw InvalidGithubMarkdownUrlException for a non-GitHub URL', ({
		assert,
	}) => {
		const githubService = new GithubService(new NoCacheService());

		assert.throws(
			() => githubService.toBlobUrl('https://example.com/not-github.md'),
			InvalidGithubMarkdownUrlException
		);
	});
});
