import { projectName } from '#config/project';
import { Link } from '@inertiajs/react';
import { Anchor, Box, Burger, Group, rem } from '@mantine/core';
import { ClientOnly } from '~/components/generics/client_only';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import { ThemeSwitcher } from '~/components/generics/theme_switcher';

interface NavbarProps {
	isMobile: boolean;
	pinned: boolean;
	opened: boolean;
	setOpened: (opened: boolean) => void;
}
export const FloatingNavbar = ({
	isMobile,
	pinned,
	opened,
	setOpened,
}: NavbarProps) => (
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

			<Group>
				<Anchor component={Link} href="/videos">
					Vidéos
				</Anchor>
				<Anchor component={Link} href="/guides">
					Guides
				</Anchor>
				<ExternalLinkStyled href="https://www.youtube.com/c/Piwi_youtube">
					@Piwi
				</ExternalLinkStyled>
				<ClientOnly>
					<ThemeSwitcher />
				</ClientOnly>
			</Group>
		</Group>
	</Box>
);
