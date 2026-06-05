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
	<a
		target="_blank"
		rel="noreferrer"
		className={clsx(
			'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
			className
		)}
		{...props}
	>
		{children}
	</a>
);
