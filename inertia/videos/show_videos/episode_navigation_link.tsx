import { Link } from '@adonisjs/inertia/react';

import { cn } from '~/shared/lib/cn';

interface EpisodeNavigationLinkProps {
	href: string;
	label: string;
	title: string;
	align: 'start' | 'end';
}

const linkBase =
	'block rounded-lg border border-gray-200 px-4 py-3 transition-colors hover:border-blue-400 focus-visible:outline-2 focus-visible:outline-blue-500 dark:border-gray-700 dark:hover:border-blue-400';

export const EpisodeNavigationLink = ({
	href,
	label,
	title,
	align,
}: Readonly<EpisodeNavigationLinkProps>) => (
	<Link
		href={href}
		prefetch="hover"
		className={cn(linkBase, align === 'end' ? 'text-right' : 'text-left')}
	>
		<span className="block text-xs text-gray-500 dark:text-gray-400">
			{label}
		</span>
		<span className="line-clamp-1 block text-gray-900 dark:text-gray-100">
			{title}
		</span>
	</Link>
);
