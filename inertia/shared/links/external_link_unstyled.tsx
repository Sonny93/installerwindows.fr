import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react';

import { cn } from '~/shared/lib/cn';
import { NewTabHint } from '~/shared/links/new_tab_hint';

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
	<a target="_blank" rel="noreferrer" className={cn(className)} {...props}>
		{children}
		<NewTabHint />
	</a>
);
