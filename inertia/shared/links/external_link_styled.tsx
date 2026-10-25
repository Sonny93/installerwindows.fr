import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react';

import { cn } from '~/shared/lib/cn';
import { NewTabHint } from '~/shared/links/new_tab_hint';

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
			'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
			className
		)}
		{...props}
	>
		{children}
		<NewTabHint />
	</a>
);
