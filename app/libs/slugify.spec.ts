import { test } from '@japa/runner';

import { slugify } from '#libs/slugify';

test.group('slugify', () => {
	test('should replace spaces and punctuation with dashes and lowercase the result', ({
		assert,
	}) => {
		assert.equal(slugify('Hello World!'), 'hello-world-');
	});

	test('should strip accented characters instead of turning them into dashes', ({
		assert,
	}) => {
		assert.equal(slugify('Café Été'), 'cafe-ete');
	});

	test('should return an empty string when called without a value', ({
		assert,
	}) => {
		assert.equal(slugify(), '');
	});
});
