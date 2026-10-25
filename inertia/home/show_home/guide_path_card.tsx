import { Link } from '@adonisjs/inertia/react';

import { cn } from '~/shared/lib/cn';

interface GuidePathCardProps {
	href: string;
	iconClass: string;
	audience: string;
	title: string;
	description: string;
	callToAction: string;
}

export const GuidePathCard = ({
	href,
	iconClass,
	audience,
	title,
	description,
	callToAction,
}: Readonly<GuidePathCardProps>) => (
	<Link
		href={href}
		prefetch="hover"
		className={cn(
			'group flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6',
			'hover:border-blue-400 hover:shadow-sm',
			'motion-safe:transition-[border-color,box-shadow]',
			'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
			'dark:border-gray-700 dark:bg-gray-900/60 dark:hover:border-blue-400'
		)}
	>
		<span className="flex size-10 items-center justify-center rounded-full border border-gray-300 text-blue-700 dark:border-gray-600 dark:text-blue-300">
			<span className={cn(iconClass, 'size-5')} aria-hidden="true" />
		</span>
		<div className="flex flex-col gap-1">
			<span className="text-sm font-medium text-blue-700 dark:text-blue-300">
				{audience}
			</span>
			<h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
				{title}
			</h3>
		</div>
		<p className="text-gray-600 dark:text-gray-400">{description}</p>
		<span className="mt-auto flex items-center gap-1 pt-2">
			<span className="font-medium text-blue-700 dark:text-blue-300">
				{callToAction}
			</span>
			<span
				className="i-tabler-arrow-right size-4 text-blue-700 group-hover:translate-x-0.5 motion-safe:transition-transform dark:text-blue-300"
				aria-hidden="true"
			/>
		</span>
	</Link>
);
