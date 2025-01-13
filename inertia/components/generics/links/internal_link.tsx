import { Link } from '@inertiajs/react';
import { Anchor } from '@mantine/core';
import { CSSProperties } from 'react';

interface InternalLinkProps {
	children: React.ReactNode;
	href: string;
	style?: CSSProperties;
	onClick?: () => void;
}

export const InternalLink = ({
	children,
	href,
	style,
	onClick,
}: InternalLinkProps) => (
	<Anchor component={Link} href={href} style={style} prefetch onClick={onClick}>
		{children}
	</Anchor>
);
