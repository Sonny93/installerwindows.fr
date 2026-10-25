import { Link } from '@adonisjs/inertia/react';
import type { CSSProperties } from 'react';

import { cn } from '~/shared/lib/cn';

interface InternalLinkProps {
	children: React.ReactNode;
	href: string;
	style?: CSSProperties;
	className?: string;
	onClick?: () => void;
	ariaCurrent?: 'page';
}

export const InternalLink = ({
	children,
	href,
	style,
	className,
	onClick,
	ariaCurrent,
}: InternalLinkProps) => (
	<Link
		href={href}
		style={style}
		className={cn(
			'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
			'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
			className
		)}
		prefetch="hover"
		onClick={onClick}
		aria-current={ariaCurrent}
	>
		{children}
	</Link>
);
