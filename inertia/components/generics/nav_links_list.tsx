import type { NavLink } from '~/components/generics/nav_link';
import { InternalLink } from '~/components/generics/links/internal_link';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';

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
