import { Link } from '@adonisjs/inertia/react';
import { Data } from '@generated/data';
import clsx from 'clsx';

interface GuideCardProps {
	guide: Data.Guide;
}

const cardLink =
	'group relative block overflow-visible border-none bg-transparent p-0 shadow-none no-underline';

const cardBefore =
	'pointer-events-none absolute top-1/2 left-1/2 z-[-1] h-[85%] w-[85%] -trangray-x-1/2 -trangray-y-1/2 rounded-md bg-gray-300 opacity-0 transition-all duration-150 group-hover:h-[calc(100%+1rem)] group-hover:w-[calc(100%+1rem)] group-hover:opacity-100 dark:bg-gray-900';

const thumbWrap = 'overflow-hidden rounded-md shadow-md';

export const GuideCard = ({ guide }: Readonly<GuideCardProps>) => (
	<Link
		href={`/guides/${guide.slug}`}
		className={clsx(cardLink, 'text-inherit')}
	>
		<span className={cardBefore} aria-hidden />
		<div className={clsx(thumbWrap, 'aspect-video')}>
			<img
				src={guide.thumbnail}
				alt={`${guide.title} thumbnail`}
				className="h-full w-full object-cover"
			/>
		</div>
		<div className="px-2 pt-2 pb-0">
			<p className="text-xs text-gray-500 dark:text-gray-400">
				{guide.createdAt}
			</p>
			<p
				className="line-clamp-1 text-gray-900 dark:text-gray-100"
				title={guide.title}
			>
				{guide.title}
			</p>
		</div>
	</Link>
);
