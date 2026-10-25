import { ClientOnly, IconButton, ThemeToggle } from '@minimalstuff/ui';
import { useState, type FocusEvent } from 'react';

import type { NavLink } from '~/layouts/navbar/nav_link';
import { NavLinksList } from '~/layouts/navbar/nav_links_list';
import { AppDrawer } from '~/shared/app_drawer';
import {
	EDITOR_NAME,
	EDITOR_YTB_URL,
	PROJECT_NAME,
} from '~/shared/consts/project';
import { HelpButton } from '~/shared/help_button';
import { useHeadroom } from '~/shared/hooks/use_headroom';
import { useMediaQuery } from '~/shared/hooks/use_media_query';
import { cn } from '~/shared/lib/cn';
import { getThemeAriaLabel } from '~/shared/lib/theme';
import { urlFor } from '~/shared/lib/url_for';
import { InternalLink } from '~/shared/links/internal_link';

const MQ_SM = '(max-width: 767px)';

const links: NavLink[] = [
	{ label: 'Vidéos', href: urlFor('videos.show_videos'), external: false },
	{ label: 'Guides', href: urlFor('guides.show_guides'), external: false },
	{ label: EDITOR_NAME, href: EDITOR_YTB_URL, external: true },
];

interface FloatingNavbarProps {
	layoutMaxWidth: string;
}

export function FloatingNavbar({
	layoutMaxWidth,
}: Readonly<FloatingNavbarProps>) {
	const [isMenuOpened, setIsMenuOpened] = useState(false);
	const [hasFocusWithin, setHasFocusWithin] = useState(false);
	const isMobile = useMediaQuery(MQ_SM);
	const isPinned = useHeadroom({ fixedAt: 120 });
	const isDrawerOpen = isMenuOpened && isMobile;
	const isVisible = isPinned || hasFocusWithin;

	const close = () => setIsMenuOpened(false);
	const toggle = () => setIsMenuOpened((menuOpened) => !menuOpened);
	const handleFocus = () => setHasFocusWithin(true);
	const handleBlur = (event: FocusEvent<HTMLElement>) => {
		if (
			event.relatedTarget &&
			event.currentTarget.contains(event.relatedTarget)
		) {
			return;
		}
		setHasFocusWithin(false);
	};

	return (
		<>
			<header
				className={cn(
					'sticky top-0 z-[9] w-full shrink-0 border-b border-gray-200 bg-gray-100 motion-safe:transition-transform motion-safe:duration-300 dark:border-gray-700 dark:bg-gray-900',
					isVisible ? 'translate-y-0' : '-translate-y-full'
				)}
				onFocus={handleFocus}
				onBlur={handleBlur}
			>
				<div
					className="mx-auto flex h-[60px] w-full items-center justify-between gap-3 px-2 md:px-4"
					style={{ maxWidth: layoutMaxWidth }}
				>
					<div className="flex items-center gap-3">
						{isMobile ? (
							<IconButton
								icon={isMenuOpened ? 'i-tabler-x' : 'i-tabler-menu-2'}
								aria-label={isMenuOpened ? 'Fermer le menu' : 'Ouvrir le menu'}
								variant="ghost"
								onClick={toggle}
							/>
						) : null}
						<InternalLink
							href={urlFor('home.show_home')}
							className="text-2xl font-medium no-underline hover:opacity-90 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
						>
							{PROJECT_NAME}
						</InternalLink>
					</div>

					{isMobile ? null : (
						<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
							<HelpButton />
							<NavLinksList
								links={links}
								onLinkClick={close}
								className="flex items-center gap-x-4"
							/>
							<ThemeToggle getAriaLabel={getThemeAriaLabel} />
						</div>
					)}
				</div>
			</header>

			<AppDrawer
				opened={isDrawerOpen}
				onClose={close}
				title={PROJECT_NAME}
				zIndex={999999}
			>
				<div className="flex flex-col gap-4">
					<NavLinksList
						links={links}
						onLinkClick={close}
						className="flex flex-col gap-4"
					/>
					<ClientOnly>
						<ThemeToggle getAriaLabel={getThemeAriaLabel} />
					</ClientOnly>
				</div>
			</AppDrawer>
		</>
	);
}
