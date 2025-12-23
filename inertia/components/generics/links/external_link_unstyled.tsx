import { CSSProperties } from '@mantine/core';
import { AnchorHTMLAttributes, ReactNode } from 'react';

interface ExternalLinkUnstyledProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children: ReactNode;
	style?: CSSProperties;
	title?: string;
	className?: string;
}
export const ExternalLinkUnstyled = ({
	children,
	...props
}: ExternalLinkUnstyledProps) => (
	<a target="_blank" rel="noreferrer" {...props}>
		{children}
	</a>
);
