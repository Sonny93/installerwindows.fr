import { projectName } from '#config/project';
import { Link } from '@inertiajs/react';
import {
	Anchor,
	Box,
	Burger,
	Drawer,
	Flex,
	Group,
	rem,
	useMantineTheme,
} from '@mantine/core';
import { useHeadroom, useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { ClientOnly } from '~/components/generics/client_only';
import { HelpButton } from '~/components/generics/help_button';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import { ThemeSwitcher } from '~/components/generics/theme_switcher';

const links = [
	{ label: 'Vidéos', href: '/videos', external: false },
	{ label: 'Guides', href: '/guides', external: false },
	{
		label: '@Piwi',
		href: 'https://www.youtube.com/c/Piwi_youtube',
		external: true,
	},
];

const showLinks = links.map((link) => {
	if (link.external) {
		return (
			<ExternalLinkStyled href={link.href} key={link.label}>
				{link.label}
			</ExternalLinkStyled>
		);
	}
	return (
		<Anchor component={Link} href={link.href} key={link.label}>
			{link.label}
		</Anchor>
	);
});

export function FloatingNavbar() {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`, false);
	const pinned = useHeadroom({ fixedAt: 120 });

	useEffect(() => {
		if (opened && !isMobile) {
			setOpened(false);
		}
	}, [isMobile]);

	return (
		<Box
			style={{
				zIndex: 999999,
				position: 'sticky',
				top: 0,
				left: 0,
				right: 0,
				height: rem(60),
				backgroundColor: 'var(--mantine-color-body)',
				paddingInline: 'var(--mantine-spacing-lg)',
				paddingBlock: 'var(--mantine-spacing-sm)',
				transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
				transition: 'transform 400ms ease',
			}}
		>
			<Group justify="space-between">
				<Group>
					{isMobile && (
						<Burger opened={opened} onClick={() => setOpened(!opened)} />
					)}
					<Anchor component={Link} style={{ fontSize: rem(24) }} href="/">
						{projectName}
					</Anchor>
				</Group>

				{!isMobile && (
					<Group>
						<HelpButton />
						{showLinks}
						<ClientOnly>
							<ThemeSwitcher />
						</ClientOnly>
					</Group>
				)}
			</Group>

			{/* Mobile drawer */}
			<Drawer
				opened={opened}
				onClose={() => setOpened(false)}
				padding="md"
				title={projectName}
				zIndex={999999}
			>
				<Flex direction="column" gap="md">
					{showLinks}
					<ClientOnly>
						<ThemeSwitcher />
					</ClientOnly>
				</Flex>
			</Drawer>
		</Box>
	);
}
