import { cn } from '~/shared/lib/cn';
import type { TocItem } from '~/shared/markdown/toc/toc_item';

interface TocLinkListProps {
	toc: TocItem[] | undefined;
	activeId: string | null;
	onItemClick: () => void;
}

export const TocLinkList = ({
	toc,
	activeId,
	onItemClick,
}: Readonly<TocLinkListProps>) => (
	<div className="flex flex-col gap-0.5">
		{toc?.map((item) => (
			<a
				href={`#${item.id}`}
				key={item.id}
				className={cn(
					'min-h-10 flex items-center text-sm leading-snug border-l border-gray-300 dark:border-gray-600 py-1 pr-2 no-underline transition-colors rounded-r-sm pl-4',
					activeId === item.id &&
						'font-medium text-blue-600 dark:text-blue-400 bg-gray-200 dark:bg-gray-950/40'
				)}
				onClick={onItemClick}
			>
				{item.text}
			</a>
		))}
	</div>
);
