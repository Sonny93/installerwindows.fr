import { Link } from '@adonisjs/inertia/react';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';

interface TextIconProps {
	icon: string;
	iconClass?: string;
	children: ReactNode;
	href: string;
	external?: boolean;
}

export function TextIcon({
	icon,
	iconClass = 'h-4 w-4 shrink-0',
	children,
	href,
	external = false,
}: Readonly<TextIconProps>) {
	const content = (
		<span className="flex items-center gap-2">
			<span
				className={clsx(icon, iconClass, 'text-gray-500 dark:text-slate-400')}
				aria-hidden
			/>
			<span>{children}</span>
		</span>
	);

	const linkClass = clsx(
		'text-sm font-normal text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors no-underline'
	);

	if (external) {
		return (
			<ExternalLinkUnstyled className={linkClass} href={href}>
				{content}
			</ExternalLinkUnstyled>
		);
	}
	return (
		<Link className={linkClass} href={href}>
			{content}
		</Link>
	);
}
