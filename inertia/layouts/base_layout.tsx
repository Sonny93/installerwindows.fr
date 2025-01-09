import { primaryColor } from '#config/project';
import { createTheme, MantineProvider, rem } from '@mantine/core';
import { PropsWithChildren } from 'react';

const customTheme = createTheme({
	colors: {
		blue: [
			'#e7f5ff',
			'#d0ebff',
			'#a5d8ff',
			'#74c0fc',
			'#4dabf7',
			primaryColor,
			'#228be6',
			'#1c7ed6',
			'#1971c2',
			'#1864ab',
		],
	},
	primaryColor: 'blue',
	fontFamily: 'Poppins, sans-serif',
	respectReducedMotion: true,
	components: {
		Button: {
			styles: {
				root: {
					fontWeight: '400',
				},
			},
		},
	},
	headings: {
		fontWeight: '400',

		sizes: {
			h1: {
				fontSize: rem(36),
				lineHeight: '1.4',
			},
			h2: { fontSize: rem(30), lineHeight: '1.5' },
			h3: { fontSize: rem(24), lineHeight: '1.5' },
			h4: { fontSize: rem(20), lineHeight: '1.5' },
			h5: { fontSize: rem(16), lineHeight: '1.5' },
			h6: { fontSize: rem(12), lineHeight: '1.5' },
		},
	},
});

export const BaseLayout = ({ children }: PropsWithChildren) => (
	<MantineProvider theme={customTheme}>{children}</MantineProvider>
);
