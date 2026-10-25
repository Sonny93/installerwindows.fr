import { Button } from '@minimalstuff/ui';
import { useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { AppDrawer } from '~/shared/app_drawer';
import { useHeadroom } from '~/shared/hooks/use_headroom';
import { useMediaQuery } from '~/shared/hooks/use_media_query';
import { cn } from '~/shared/lib/cn';
import type { MarkdownBuilderProps } from '~/shared/markdown/builder/markdown_builder_props';
import { TocLinkList } from '~/shared/markdown/toc/toc_link_list';
import { useActiveTocHeading } from '~/shared/markdown/toc/use_active_toc_heading';

const MQ_SM = '(max-width: 767px)';

const tocIconClass = 'i-tabler-list-search size-[18px] shrink-0';

interface MarkdownTocProps extends Omit<MarkdownBuilderProps, 'html'> {}

export function MarkdownToc({ toc, actions }: Readonly<MarkdownTocProps>) {
	const [opened, setOpened] = useState(false);
	const isMobile = useMediaQuery(MQ_SM);
	const pinned = useHeadroom({ fixedAt: 120 });
	const docReady = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false
	);
	const activeId = useActiveTocHeading(toc);
	const isDrawerOpen = opened && isMobile;

	const closeDrawer = () => setOpened(false);
	const openDrawer = () => setOpened(true);

	const tocHeader = (
		<div className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
			<span className={tocIconClass} aria-hidden />
			<span>Table des matières</span>
		</div>
	);

	const mobileFab = isMobile ? (
		<Button
			variant="outline"
			size="sm"
			onClick={openDrawer}
			className={cn(
				'fixed left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 gap-2 bg-gray-50 shadow-md transition-all dark:bg-gray-900',
				pinned ? 'bottom-4' : '-bottom-24'
			)}
		>
			<span className={tocIconClass} aria-hidden />
			<span>Table des matières</span>
		</Button>
	) : null;

	return (
		<>
			{!isMobile && (
				<nav
					className="sticky w-[250px] shrink-0 top-[100px]"
					aria-label="Table des matières"
				>
					<div className="mb-4">{tocHeader}</div>
					<TocLinkList
						toc={toc}
						activeId={activeId}
						onItemClick={closeDrawer}
					/>
					{actions ? (
						<div className="mt-4 flex w-full flex-col gap-2">{actions}</div>
					) : null}
				</nav>
			)}
			<AppDrawer opened={isDrawerOpen} onClose={closeDrawer} title={tocHeader}>
				<TocLinkList toc={toc} activeId={activeId} onItemClick={closeDrawer} />
			</AppDrawer>
			{docReady && mobileFab ? createPortal(mobileFab, document.body) : null}
		</>
	);
}
