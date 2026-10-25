import type { NavLink } from '~/layouts/navbar/nav_link';
import { ExternalLinkStyled } from '~/shared/links/external_link_styled';
import { InternalLink } from '~/shared/links/internal_link';

interface NavLinksListProps {
	links: NavLink[];
	onLinkClick: () => void;
}

export const NavLinksList = ({
	links,
	onLinkClick,
}: Readonly<NavLinksListProps>) => (
	<>
		{links.map((link) =>
			link.external ? (
				<ExternalLinkStyled
					href={link.href}
					key={link.label}
					onClick={onLinkClick}
				>
					{link.label}
				</ExternalLinkStyled>
			) : (
				<InternalLink
					href={link.href}
					key={link.label}
					className="font-normal"
					onClick={onLinkClick}
				>
					{link.label}
				</InternalLink>
			)
		)}
	</>
);
