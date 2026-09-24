import { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react';

import { cn } from '~/shared/lib/cn';

interface ExternalLinkStyledProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children: ReactNode;
	style?: CSSProperties;
	title?: string;
	className?: string;
}

export const ExternalLinkStyled = ({
	children,
	title,
	className,
	...props
}: ExternalLinkStyledProps) => (
	<a
		target="_blank"
		rel="noreferrer"
		title={title}
		className={cn(
			'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
			className
		)}
		{...props}
	>
		{children}
	</a>
);
