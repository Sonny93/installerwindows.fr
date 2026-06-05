import { ClientOnly, IconButton, ThemeToggle } from '@minimalstuff/ui';
import { useEffect, useState } from 'react';
import { AppDrawer } from '~/components/generics/app_drawer';
import { HelpButton } from '~/components/generics/help_button';
import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';
import { InternalLink } from '~/components/generics/links/internal_link';
import { EDITOR_NAME, EDITOR_YTB_URL, PROJECT_NAME } from '~/consts/project';
import { useHeadroom } from '~/hooks/use_headroom';
import { useMediaQuery } from '~/hooks/use_media_query';

const MQ_SM = '(max-width: 767px)';

const NAV_LINK_CLASS =
	'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white font-normal transition-colors no-underline text-sm';

const links = [
	{ label: 'Vidéos', href: '/videos', external: false },
	{ label: 'Guides', href: '/guides', external: false },
	{
		label: EDITOR_NAME,
		href: EDITOR_YTB_URL,
		external: true,
	},
];

interface FloatingNavbarProps {
	layoutMaxWidth: string;
}

export function FloatingNavbar({
	layoutMaxWidth,
}: Readonly<FloatingNavbarProps>) {
	const [opened, setOpened] = useState(false);
	const isMobile = useMediaQuery(MQ_SM);
	const pinned = useHeadroom({ fixedAt: 120 });

	const close = () => setOpened(false);
	const toggle = () => setOpened((o) => !o);

	const showLinks = links.map((link) => {
		const onClick = () => close();
		if (link.external) {
			return (
				<ExternalLinkUnstyled
					href={link.href}
					key={link.label}
					onClick={onClick}
					className={NAV_LINK_CLASS}
				>
					{link.label}
				</ExternalLinkUnstyled>
			);
		}

		return (
			<InternalLink
				href={link.href}
				key={link.label}
				className={NAV_LINK_CLASS}
				onClick={onClick}
			>
				{link.label}
			</InternalLink>
		);
	});

	useEffect(() => {
		if (opened && !isMobile) {
			setOpened(false);
		}
	}, [isMobile, opened]);

	return (
		<>
			<div
				className="sticky top-0 z-[9] w-full shrink-0 transition-transform duration-[400ms] ease-out bg-white/90 dark:bg-[#0d0d1a]/90 backdrop-blur-xl border-b border-gray-100 dark:border-white/5"
				style={{
					transform: pinned ? 'translate3d(0,0,0)' : 'translate3d(0,-110px,0)',
				}}
			>
				<div
					className="mx-auto flex h-16 w-full items-center justify-between gap-3 px-4 md:px-6"
					style={{ maxWidth: layoutMaxWidth }}
				>
					<div className="flex items-center gap-3">
						{isMobile ? (
							<IconButton
								icon={opened ? 'i-tabler-x' : 'i-tabler-menu-2'}
								aria-label={opened ? 'Fermer le menu' : 'Ouvrir le menu'}
								variant="ghost"
								onClick={toggle}
							/>
						) : null}
						<InternalLink
							href="/"
							className="text-lg no-underline text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
						>
							{PROJECT_NAME}
						</InternalLink>
					</div>

					{isMobile ? null : (
						<div className="flex flex-wrap items-center gap-x-6 gap-y-2">
							<HelpButton />
							{showLinks}
							<ThemeToggle />
						</div>
					)}
				</div>
			</div>

			<AppDrawer
				opened={opened && isMobile}
				onClose={close}
				title={PROJECT_NAME}
				zIndex={999999}
			>
				<div className="flex flex-col gap-5">
					{showLinks}
					<ClientOnly>
						<ThemeToggle />
					</ClientOnly>
				</div>
			</AppDrawer>
		</>
	);
}
