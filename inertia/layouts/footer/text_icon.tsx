import { Link } from '@adonisjs/inertia/react';
import type { ReactNode } from 'react';

import { cn } from '~/shared/lib/cn';
import { ExternalLinkStyled } from '~/shared/links/external_link_styled';

interface TextIconProps {
	icon: string;
	iconClass?: string;
	children: ReactNode;
	href: string;
	external?: boolean;
}

export function TextIcon({
	icon,
	iconClass = 'h-6 w-6 shrink-0',
	children,
	href,
	external = false,
}: Readonly<TextIconProps>) {
	const content = (
		<span className="flex items-center gap-2">
			<span
				className={cn(icon, iconClass, 'text-black dark:text-white')}
				aria-hidden
			/>
			<span className="text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300">
				{children}
			</span>
		</span>
	);

	const linkClass = cn(
		'group font-normal text-black dark:text-white rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
	);

	if (external) {
		return (
			<ExternalLinkStyled className={linkClass} href={href}>
				{content}
			</ExternalLinkStyled>
		);
	}
	return (
		<Link className={linkClass} href={href}>
			{content}
		</Link>
	);
}
