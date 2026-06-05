import { Link } from '@adonisjs/inertia/react';
import clsx from 'clsx';
import { type ReactNode } from 'react';

export interface ContentCardProps {
	href: string;
	thumbnailSrc: string;
	thumbnailAlt: string;
	meta?: ReactNode;
	title: string;
	dataActive?: 'true' | 'false';
	className?: string;
	bodyClassName?: string;
	metaClassName?: string;
	titleClassName?: string;
}

const cardBase =
	'group block no-underline rounded-xl bg-white border border-gray-100 dark:bg-[#111120] dark:border-white/5 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/8 dark:hover:border-blue-500/20 dark:hover:shadow-blue-500/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f9fc] dark:focus-visible:ring-offset-[#080811]';

export const ContentCard = ({
	href,
	thumbnailSrc,
	thumbnailAlt,
	meta,
	title,
	dataActive,
	className,
	bodyClassName,
	metaClassName,
	titleClassName,
}: Readonly<ContentCardProps>) => (
	<Link
		href={href}
		className={clsx(cardBase, className)}
		data-active={dataActive}
	>
		<div className="aspect-video overflow-hidden">
			<img
				src={thumbnailSrc}
				alt={thumbnailAlt}
				className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
		</div>
		<div className={clsx('px-3 pt-2.5 pb-3', bodyClassName)}>
			{meta ? (
				<p className={clsx('text-xs mb-1', metaClassName)}>{meta}</p>
			) : null}
			<p
				className={clsx('line-clamp-2 text-sm leading-snug', titleClassName)}
				title={title}
			>
				{title}
			</p>
		</div>
	</Link>
);
