import { Link } from '@adonisjs/inertia/react';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';

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
				className={clsx(icon, iconClass, 'text-black dark:text-white')}
				aria-hidden
			/>
			<span className="text-black dark:text-white">{children}</span>
		</span>
	);

	const linkClass = clsx(
		'font-normal hover:opacity-80 text-black dark:text-white'
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
