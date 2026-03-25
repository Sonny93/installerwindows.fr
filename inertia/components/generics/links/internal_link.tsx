import { Link } from '@adonisjs/inertia/react';
import clsx from 'clsx';
import { CSSProperties } from 'react';

interface InternalLinkProps {
	children: React.ReactNode;
	href: string;
	style?: CSSProperties;
	className?: string;
	onClick?: () => void;
}

export const InternalLink = ({
	children,
	href,
	style,
	className,
	onClick,
}: InternalLinkProps) => (
	<Link
		href={href}
		style={style}
		className={clsx(
			'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
			className
		)}
		prefetch="hover"
		onClick={onClick}
	>
		{children}
	</Link>
);
