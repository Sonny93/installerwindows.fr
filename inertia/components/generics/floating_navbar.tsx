import { editorName, editorYtbUrl, projectName } from '#config/project';
import {
	Box,
	Burger,
	Drawer,
	Flex,
	Group,
	rem,
	useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useHeadroom, useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';
import { ClientOnly } from '~/components/generics/client_only';
import { HelpButton } from '~/components/generics/help_button';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import { InternalLink } from '~/components/generics/links/internal_link';
import { ThemeSwitcher } from '~/components/generics/theme_switcher';

const links = [
	{ label: 'Vidéos', href: '/videos', external: false },
	{ label: 'Guides', href: '/guides', external: false },
	{
		label: editorName,
		href: editorYtbUrl,
		external: true,
	},
];

export function FloatingNavbar() {
	const theme = useMantineTheme();
	const [opened, handler] = useDisclosure(false);
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`, false);
	const pinned = useHeadroom({ fixedAt: 120 });

	const showLinks = links.map((link) => {
		const onClick = () => handler.close();
		if (link.external) {
			return (
				<ExternalLinkStyled href={link.href} key={link.label} onClick={onClick}>
					{link.label}
				</ExternalLinkStyled>
			);
		}

		return (
			<InternalLink href={link.href} key={link.label} onClick={onClick}>
				{link.label}
			</InternalLink>
		);
	});

	useEffect(() => {
		if (opened && !isMobile) {
			handler.close();
		}
	}, [isMobile]);

	return (
		<Box
			style={{
				zIndex: 9,
				position: 'sticky',
				top: 0,
				left: 0,
				right: 0,
				height: rem(60),
				backgroundColor: 'light-dark(var(--mantine-color-gray-0), #1b2028)',
				paddingInline: 'var(--mantine-spacing-lg)',
				paddingBlock: 'var(--mantine-spacing-sm)',
				transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
				transition: 'transform 400ms ease',
			}}
		>
			<Group justify="space-between">
				<Group>
					{isMobile && <Burger opened={opened} onClick={handler.toggle} />}
					<InternalLink style={{ fontSize: rem(24) }} href="/">
						{projectName}
					</InternalLink>
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
				onClose={handler.close}
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
