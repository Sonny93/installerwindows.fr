import { createPortal } from 'react-dom';
import { Button } from '@minimalstuff/ui';
import { useState, useSyncExternalStore } from 'react';

import { cn } from '~/lib/cn';
import { useAuth } from '~/hooks/use_auth';
import { useHeadroom } from '~/hooks/use_headroom';
import { useMediaQuery } from '~/hooks/use_media_query';
import { AppDrawer } from '~/components/generics/app_drawer';
import { TocLinkList } from '~/components/markdown/toc/toc_link_list';
import { GuideTocControls } from '~/components/guides/guide_toc_controls';
import { useActiveTocHeading } from '~/components/markdown/toc/use_active_toc_heading';
import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';
import type { MarkdownBuilderProps } from '~/components/markdown/builder/markdown_builder_props';

const MQ_SM = '(max-width: 767px)';

const tocIconClass = 'i-tabler-list-search size-[18px] shrink-0';

const btnOutline =
	'inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:focus:ring-offset-gray-900';

interface MarkdownTocProps extends Omit<MarkdownBuilderProps, 'html'> {}

export function MarkdownToc({
	toc,
	slug,
	githubUrl,
}: Readonly<MarkdownTocProps>) {
	const { isAuthenticated } = useAuth();
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
					{githubUrl ? (
						<div className="mt-4 flex w-full flex-col gap-2">
							<ExternalLinkUnstyled href={githubUrl} className={btnOutline}>
								Contribuer
							</ExternalLinkUnstyled>
							{isAuthenticated && slug ? (
								<div className="flex w-full flex-col gap-2">
									<GuideTocControls slug={slug} />
								</div>
							) : null}
						</div>
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
