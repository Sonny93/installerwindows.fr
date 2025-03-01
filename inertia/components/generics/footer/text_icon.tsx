import { Link } from '@inertiajs/react';
import { Anchor, Group } from '@mantine/core';
import { ReactNode } from 'react';
import { IconType } from 'react-icons/lib';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import classes from './footer.module.css';

export function TextIcon({
	icon: Icon,
	children,
	href,
	external = false,
}: {
	icon: IconType;
	children: ReactNode;
	href: string;
	external?: boolean;
}) {
	const content = (
		<Group gap="sm">
			<Icon size={24} />
			{children}
		</Group>
	);

	if (external) {
		return (
			<ExternalLinkStyled className={classes.footer__link} href={href}>
				{content}
			</ExternalLinkStyled>
		);
	}
	return (
		<Anchor component={Link} className={classes.footer__link} href={href}>
			{content}
		</Anchor>
	);
}
