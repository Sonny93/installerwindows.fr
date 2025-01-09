import { Link } from '@inertiajs/react';
import { Anchor } from '@mantine/core';
import { CSSProperties } from 'react';

interface InternalLinkProps {
	children: React.ReactNode;
	href: string;
	style?: CSSProperties;
}

export const InternalLink = ({ children, href, style }: InternalLinkProps) => (
	<Anchor component={Link} href={href} style={style} prefetch>
		{children}
	</Anchor>
);
