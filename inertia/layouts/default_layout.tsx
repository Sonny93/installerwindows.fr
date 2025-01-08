import { projectName } from '#config/project';
import { Link, usePage } from '@inertiajs/react';
import {
	Box,
	Drawer,
	NavLink,
	rem,
	ScrollArea,
	useMantineTheme,
} from '@mantine/core';
import { useHeadroom, useMediaQuery } from '@mantine/hooks';
import { PropsWithChildren, useEffect, useState } from 'react';
import { TbHome2, TbSettings } from 'react-icons/tb';
import { FloatingNavbar } from '~/components/generics/floating_navbar';
import { BaseLayout } from './base_layout';

const DefaultLayout = ({ children }: PropsWithChildren) => (
	<BaseLayout>
		<Layout>{children}</Layout>
	</BaseLayout>
);

export default DefaultLayout;

function Layout({ children }: PropsWithChildren) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(true);
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`, false);
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
			{/* Top navbar */}
			<FloatingNavbar
				isMobile={isMobile!}
				pinned={pinned}
				opened={opened}
				setOpened={setOpened}
			/>

			{/* Page content */}
			<Box
				style={{
					minHeight: '100vh',
					maxWidth: '100%',
					width: '1200px',
					margin: '0 auto',
					marginBlock: rem(60),
					display: 'flex',
				}}
			>
				{/* Content */}
				<Box
					style={{
						height: '100%',
						width: '100%',
						flex: 1,
						paddingInline: '1rem',
					}}
				>
					{children}
				</Box>

				{/* Sidebar */}
				{!isMobile && (
					<Box w={250} maw="250px" p="md">
						<NavMenu />
					</Box>
				)}

				{/* Mobile drawer */}
				<Drawer
					opened={opened}
					onClose={() => setOpened(false)}
					padding="md"
					title={projectName}
					zIndex={999999}
				>
					<NavMenu />
				</Drawer>
			</Box>
		</>
	);
}
