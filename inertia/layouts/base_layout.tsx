import { primaryColor } from '#config/project';
import { PageProps } from '@adonisjs/inertia/types';
import { usePage } from '@inertiajs/react';
import {
	ColorSchemeScript,
	createTheme,
	MantineProvider,
	Notification,
	rem,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { PropsWithChildren, useState } from 'react';
import { TbX } from 'react-icons/tb';

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

export function BaseLayout({ children }: PropsWithChildren) {
	const { props } = usePage<PageProps & { flash: string }>();
	const [opened, setOpened] = useState<boolean>(!!props.flash);
	return (
		<>
			<ColorSchemeScript defaultColorScheme="dark" />
			<MantineProvider theme={customTheme} defaultColorScheme="dark">
				{opened && (
					<Notification
						icon={<TbX />}
						color="red"
						title={props.flash}
						onClose={() => setOpened(false)}
					/>
				)}
				<ModalsProvider>{children}</ModalsProvider>
			</MantineProvider>
		</>
	);
}
