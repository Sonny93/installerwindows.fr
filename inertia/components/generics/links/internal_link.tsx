import { Link } from '@inertiajs/react';
import { Anchor } from '@mantine/core';

interface InternalLinkProps {
	children: React.ReactNode;
	href: string;
}

export const InternalLink = ({ children, href }: InternalLinkProps) => (
	<Anchor component={Link} href={href}>
		{children}
	</Anchor>
);
