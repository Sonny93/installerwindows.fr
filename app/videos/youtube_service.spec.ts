import { test } from '@japa/runner';

import env from '#start/env';
import { YoutubeService } from '#videos/youtube_service';
import { NoCacheService } from '#tests/helpers/no_cache_service';
import RemoteApiErrorException from '#exceptions/remote_api_error_exception';

const validPlaylistResponseBody = {
	items: [
		{
			snippet: {
				title: 'Fake video title',
				description: 'Fake video description',
				publishedAt: '2024-01-15T00:00:00Z',
				resourceId: { videoId: 'fakeVideo01' },
			},
		},
	],
};

test.group('YoutubeService.getPlaylist', (group) => {
	const originalFetch = globalThis.fetch;

	group.each.teardown(() => {
		globalThis.fetch = originalFetch;
	});

	test('should map a valid playlist response to VideoInfo objects', async ({
		assert,
	}) => {
		globalThis.fetch = async () =>
			new Response(JSON.stringify(validPlaylistResponseBody));
		const youtubeService = new YoutubeService(new NoCacheService());

		const videos = await youtubeService.getPlaylist();

		assert.deepEqual(videos, [
			{
				id: 'fakeVideo01',
				title: 'Fake video title',
				thumbnail: 'https://img.youtube.com/vi/fakeVideo01/maxresdefault.jpg',
				description: 'Fake video description',
				url: 'https://www.youtube.com/watch?v=fakeVideo01',
				publishedAt: '15 janv. 2024',
			},
		]);
	});

	test('should throw RemoteApiErrorException when the response shape is invalid', async ({
		assert,
	}) => {
		globalThis.fetch = async () =>
			new Response(JSON.stringify({ items: [{ snippet: {} }] }));
		const youtubeService = new YoutubeService(new NoCacheService());

		await assert.rejects(
			() => youtubeService.getPlaylist(),
			RemoteApiErrorException
		);
	});

	test('should throw RemoteApiErrorException with a redacted link when the response is not ok', async ({
		assert,
	}) => {
		globalThis.fetch = async () =>
			new Response('Internal Server Error', { status: 500 });
		const youtubeService = new YoutubeService(new NoCacheService());

		try {
			await youtubeService.getPlaylist();
			assert.fail('Expected getPlaylist() to throw');
		} catch (error) {
			assert.instanceOf(error, RemoteApiErrorException);
			const link =
				error instanceof RemoteApiErrorException ? error.link : undefined;
			assert.isTrue(link?.includes('key=REDACTED'));
			assert.isFalse(link?.includes(env.get('YOUTUBE_API_KEY')));
		}
	});
});
