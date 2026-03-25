import clsx from 'clsx';
import { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react';

interface ExternalLinkUnstyledProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children: ReactNode;
	style?: CSSProperties;
	title?: string;
	className?: string;
}

export const ExternalLinkUnstyled = ({
	children,
	className,
	...props
}: ExternalLinkUnstyledProps) => (
	<a target="_blank" rel="noreferrer" className={clsx(className)} {...props}>
		{children}
	</a>
);
