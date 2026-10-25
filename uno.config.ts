import presetIcons from '@unocss/preset-icons';
import presetTypography from '@unocss/preset-typography';
import presetWebFonts from '@unocss/preset-web-fonts';
import { defineConfig, presetAttributify, presetWind4 } from 'unocss';

const markdownTypographyExtend = {
	a: {
		'text-decoration': 'none',
		'text-underline-offset': '0.2em',
		color: 'var(--colors-blue-700)',
	},
	'a:hover': {
		'text-decoration': 'underline',
	},
	h1: {
		'font-size': '2rem',
		'font-weight': 'unset',
		'line-height': '1.2',
	},
	h2: {
		'font-size': '1.5rem',
		'font-weight': 'unset',
		'line-height': '1.2',
	},
	h3: {
		'font-size': '1.25rem',
		'font-weight': 'unset',
		'line-height': '1.2',
	},
	h4: {
		'font-size': '1rem',
		'font-weight': 'unset',
		'line-height': '1.2',
	},
	h5: {
		'font-size': '0.875rem',
		'font-weight': 'unset',
		'line-height': '1.2',
	},
	h6: {
		'font-size': '0.75rem',
		'font-weight': 'unset',
		'line-height': '1.2',
	},
	blockquote: {
		'font-size': '0.9375rem',
		'font-weight': 'unset',
		'line-height': '1.65',
	},
	code: {
		'background-color': 'transparent',
	},
	strong: {
		'font-weight': '500',
	},
	img: {
		'vertical-align': 'middle',
		'border-radius': '0.25rem',
		'max-width': '100%',
		height: 'auto',
	},
	'li img': {
		display: 'inline-block',
		'vertical-align': 'middle',
		'margin-top': '0',
		'margin-bottom': '0',
		'margin-left': '0',
		'margin-right': '0.35em',
	},
	'p img:not(:only-child)': {
		display: 'inline-block',
		'vertical-align': 'middle',
		'margin-top': '0',
		'margin-bottom': '0',
		'margin-left': '0',
		'margin-right': '0.35em',
	},
	'p > img:only-child': {
		display: 'block',
		'margin-left': 'auto',
		'margin-right': 'auto',
	},
	'a img': {
		display: 'inline-block',
		'vertical-align': 'middle',
		'margin-top': '0',
		'margin-bottom': '0',
		'margin-right': '0.35em',
	},
	'details img': {
		display: 'block',
		'margin-left': 'auto',
		'margin-right': 'auto',
	},
	'li:not(:last-child)': {
		'margin-bottom': '0.5em',
	},
	'h2, h3': {
		'scroll-margin-top': '4.5rem',
	},
	pre: {
		'border-width': '1px',
		'border-style': 'solid',
		'border-color': 'var(--un-prose-td-borders)',
		'box-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.04)',
	},
	details: {
		'border-width': '1px',
		'border-style': 'solid',
		'border-color': 'var(--un-prose-td-borders)',
		'border-radius': '0.5rem',
		padding: '0.75rem 1rem',
		'margin-top': '1rem',
		'margin-bottom': '1rem',
	},
	summary: {
		cursor: 'pointer',
		'font-weight': '600',
		color: 'var(--un-prose-headings)',
		'user-select': 'none',
	},
};

export default defineConfig({
	safelist: [
		'i-heroicons-link-16-solid',
		'i-simple-icons-youtube',
		'i-simple-icons-discord',
		'i-simple-icons-github',
		'i-material-symbols-signal-wifi-4-bar',
		'i-tabler-contract',
		'i-tabler-login',
		'i-tabler-logout',
		'i-tabler-list-search',
		'text-blue-400',
		'flex',
		'flex-wrap',
		'items-center',
		'gap-2',
		'inline-flex',
		'shrink-0',
		'inline-block',
	],
	presets: [
		presetWind4({
			dark: 'class',
		}),
		presetTypography({
			cssExtend: markdownTypographyExtend,
		}),
		presetIcons({
			cdn: 'https://esm.sh/',
		}),
		presetAttributify(),
		presetWebFonts({
			provider: 'bunny',
			fonts: {
				sans: 'Poppins',
			},
		}),
	],
	preflights: [
		{
			layer: 'typography',
			getCSS: () => `
.dark .prose a {
	color: var(--colors-blue-400);
}
`,
		},
	],
});
