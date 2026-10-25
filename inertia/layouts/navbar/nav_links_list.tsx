import { usePage } from '@inertiajs/react';

import { isNavLinkActive } from '~/layouts/navbar/is_nav_link_active';
import type { NavLink } from '~/layouts/navbar/nav_link';
import { cn } from '~/shared/lib/cn';
import { ExternalLinkStyled } from '~/shared/links/external_link_styled';
import { InternalLink } from '~/shared/links/internal_link';

interface NavLinksListProps {
	links: NavLink[];
	onLinkClick: () => void;
	className?: string;
}

interface RenderNavLinkOptions {
	link: NavLink;
	currentUrl: string;
	onLinkClick: () => void;
}

function renderNavLink({
	link,
	currentUrl,
	onLinkClick,
}: RenderNavLinkOptions) {
	if (link.external) {
		return (
			<ExternalLinkStyled
				href={link.href}
				key={link.label}
				onClick={onLinkClick}
			>
				{link.label}
			</ExternalLinkStyled>
		);
	}

	const isActive = isNavLinkActive(currentUrl, link.href);

	return (
		<InternalLink
			href={link.href}
			key={link.label}
			className={cn(
				'font-normal',
				isActive && 'underline decoration-2 underline-offset-8'
			)}
			onClick={onLinkClick}
			ariaCurrent={isActive ? 'page' : undefined}
		>
			{link.label}
		</InternalLink>
	);
}

export function NavLinksList({
	links,
	onLinkClick,
	className,
}: Readonly<NavLinksListProps>) {
	const { url } = usePage();

	return (
		<nav aria-label="Navigation principale" className={className}>
			{links.map((link) =>
				renderNavLink({ link, currentUrl: url, onLinkClick })
			)}
		</nav>
	);
}
