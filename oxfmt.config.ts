import {
	ADONISJS_DEFAULT_IGNORE_PATTERNS,
	minimalstuffPreset,
	OXFMT_DEFAULT_IGNORE_PATTERNS,
} from '@minimalstuff/tooling/oxc/fmt';

export default minimalstuffPreset({
	ignorePatterns: [
		...OXFMT_DEFAULT_IGNORE_PATTERNS,
		...ADONISJS_DEFAULT_IGNORE_PATTERNS,
		'database/schema.ts',
		'CHANGELOG.md',
	],
});
