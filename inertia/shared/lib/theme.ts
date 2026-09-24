import type { Theme } from '@minimalstuff/ui';

const THEME_LABELS = {
	light: 'clair',
	dark: 'sombre',
	system: 'système',
} as const satisfies Record<Theme, string>;

export function getThemeAriaLabel(theme: Theme): string {
	return `Thème actuel : ${THEME_LABELS[theme]}`;
}
