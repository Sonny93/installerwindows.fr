import { Link } from '@adonisjs/inertia/react';
import { Data } from '@generated/data';
import clsx from 'clsx';

interface VideoCardProps extends Data.Video {
	activeVideoId?: string;
}

const cardLink =
	'group relative block overflow-visible border-none bg-transparent p-0 shadow-none no-underline';

const cardBefore =
	'pointer-events-none absolute top-1/2 left-1/2 z-[-1] h-[85%] w-[85%] -trangray-x-1/2 -trangray-y-1/2 rounded-md bg-gray-300 opacity-0 transition-all duration-150 group-hover:h-[calc(100%+1rem)] group-hover:w-[calc(100%+1rem)] group-hover:opacity-100 dark:bg-gray-900';

const thumbWrap = 'overflow-hidden rounded-md shadow-md';

export const VideoCard = ({
	id,
	title,
	thumbnail,
	publishedAt,
	activeVideoId,
}: Readonly<VideoCardProps>) => {
	const active = activeVideoId === id;
	return (
		<Link
			href={`/videos/${id}`}
			className={clsx(cardLink, 'text-inherit')}
			data-active={active ? 'true' : 'false'}
		>
			<span className={cardBefore} aria-hidden />
			<div className={clsx(thumbWrap, 'aspect-video')}>
				<img src={thumbnail} alt="" className="h-full w-full object-cover" />
			</div>
			<div
				className={clsx(
					'px-2 pt-2 pb-0',
					active
						? 'text-gray-500 dark:text-gray-300'
						: 'text-gray-900 dark:text-gray-100'
				)}
			>
				<p
					className={clsx(
						'text-xs',
						active ? 'opacity-90' : 'text-gray-500 dark:text-gray-400'
					)}
				>
					{publishedAt}
				</p>
				<p className="line-clamp-1" title={title}>
					{title}
				</p>
			</div>
		</Link>
	);
};
