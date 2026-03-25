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

const cardLink =
	'group relative isolate z-0 block overflow-visible border-none bg-transparent p-0 shadow-none no-underline';

const cardBefore =
	'pointer-events-none absolute top-1/2 left-1/2 z-[-1] h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-300 opacity-0 transition-all duration-150 group-hover:h-[calc(100%+1.25rem)] group-hover:w-[calc(100%+1.25rem)] group-hover:opacity-100 dark:bg-gray-900';

const thumbWrap = 'overflow-hidden rounded-md shadow-md';

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
		className={clsx(cardLink, 'text-inherit', className)}
		data-active={dataActive}
	>
		<span className={cardBefore} aria-hidden />
		<div className={clsx(thumbWrap, 'aspect-video')}>
			<img src={thumbnailSrc} alt={thumbnailAlt} className="h-full w-full object-cover" />
		</div>
		<div className={clsx('px-2 pt-2 pb-0', bodyClassName)}>
			{meta ? <p className={clsx('text-xs', metaClassName)}>{meta}</p> : null}
			<p className={clsx('line-clamp-1', titleClassName)} title={title}>
				{title}
			</p>
		</div>
	</Link>
);
