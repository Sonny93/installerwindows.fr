import { test } from '@japa/runner';

import VideoTransformer from '#videos/video_transformer';
import { makeVideoInfo } from '#tests/helpers/video_info_fixture';

test.group('VideoTransformer', () => {
	test('should parse the episode number and title from a numbered title', ({
		assert,
	}) => {
		const video = makeVideoInfo({ title: '3 - Installer ses pilotes' });

		const transformed = new VideoTransformer(video).toObject();

		assert.equal(transformed.episodeNumber, 3);
		assert.equal(transformed.episodeTitle, 'Installer ses pilotes');
	});

	test('should return a null episode number and the full title when the title has no numeric prefix', ({
		assert,
	}) => {
		const video = makeVideoInfo({ title: 'Les bonnes pratiques' });

		const transformed = new VideoTransformer(video).toObject();

		assert.isNull(transformed.episodeNumber);
		assert.equal(transformed.episodeTitle, 'Les bonnes pratiques');
	});

	test('should include description and publishedAt in the forPlayer variant', ({
		assert,
	}) => {
		const video = makeVideoInfo({
			title: '0 - Activer le Secure boot',
			description: 'Fake description',
			publishedAt: '1 janv. 2024',
		});

		const transformed = new VideoTransformer(video).forPlayer();

		assert.equal(transformed.description, 'Fake description');
		assert.equal(transformed.publishedAt, '1 janv. 2024');
	});
});
