import { projectName } from '#config/project';
import { Link, usePage } from '@inertiajs/react';
import {
	Box,
	Burger,
	Drawer,
	Group,
	NavLink,
	rem,
	ScrollArea,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { useHeadroom, useMediaQuery } from '@mantine/hooks';
import { PropsWithChildren, useEffect, useState } from 'react';
import { TbHome2, TbSettings } from 'react-icons/tb';
import { ThemeSwitcher } from '~/components/generics/theme_switcher';
import { BaseLayout } from './base_layout';

const DefaultLayout = ({ children }: PropsWithChildren) => (
	<BaseLayout>
		<Layout>{children}</Layout>
	</BaseLayout>
);

export default DefaultLayout;

function Layout({ children }: PropsWithChildren) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const pinned = useHeadroom({ fixedAt: 120 });

	useEffect(() => {
		if (opened && !isMobile) {
			setOpened(false);
		}
	}, [isMobile]);

	const menuItems = [
		{ label: 'Dashboard', icon: <TbHome2 size={24} />, link: '/' },
		{ label: 'Test', icon: <TbSettings size={24} />, link: '/test' },
	];

	const currentPath = usePage().url;
	const NavMenu = () => (
		<ScrollArea style={{ height: '100%' }}>
			{menuItems.map((item) => (
				<NavLink
					key={item.label}
					label={item.label}
					leftSection={item.icon}
					href={item.link}
					variant="subtle"
					active={currentPath === item.link}
					style={{
						fontSize: '1rem',
					}}
					component={Link}
				/>
			))}
		</ScrollArea>
	);

	return (
		<>
			<Box
				style={{
					position: 'sticky',
					top: 0,
					left: 0,
					right: 0,
					padding: 'var(--mantine-spacing-xs)',
					height: rem(60),
					zIndex: 999999,
					transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
					transition: 'transform 400ms ease',
					backgroundColor: 'var(--mantine-color-body)',
				}}
			>
				<Group justify="space-between">
					<Group>
						{isMobile && (
							<Burger opened={opened} onClick={() => setOpened(!opened)} />
						)}
						<Text>{projectName}</Text>
					</Group>

					<ThemeSwitcher />
				</Group>
			</Box>
			<Box
				style={{
					display: 'flex',
					minHeight: '100vh',
					width: '1200px',
					maxWidth: '100%',
					margin: '0 auto',
				}}
			>
				{!isMobile && (
					<Box
						style={{ borderRight: `1px solid ${theme.colors.gray[3]}` }}
						w={250}
						maw="250px"
						p="md"
					>
						<NavMenu />
					</Box>
				)}

				<Drawer
					opened={opened}
					onClose={() => setOpened(false)}
					padding="md"
					title={projectName}
					zIndex={999999}
				>
					<NavMenu />
				</Drawer>

				<Box
					style={{
						height: '100%',
						width: '100%',
						flex: 1,
						padding: '1rem',
						overflow: 'auto',
					}}
				>
					{children}
				</Box>
			</Box>
		</>
	);
}
