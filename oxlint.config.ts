import { minimalstuffPreset } from '@minimalstuff/tooling/oxc/lint';

export default minimalstuffPreset({
	adonisjs: true,
	react: true,
	overrides: [
		{
			files: ['**/app/**/*.ts'],
			rules: {
				'typescript/consistent-type-imports': 'off',
			},
		},
	],
});
