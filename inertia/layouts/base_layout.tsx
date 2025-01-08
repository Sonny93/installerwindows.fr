import { primaryColor } from '#config/project';
import { createTheme, MantineProvider } from '@mantine/core';
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
});

export const BaseLayout = ({ children }: PropsWithChildren) => (
	<MantineProvider theme={customTheme}>{children}</MantineProvider>
);
