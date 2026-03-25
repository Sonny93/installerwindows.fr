import { transformRawToGithubUrl } from '#shared/utils/index';
import { Button } from '@minimalstuff/ui';
import clsx from 'clsx';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { AppDrawer } from '~/components/generics/app_drawer';
import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';
import { GuideTocControls } from '~/components/guides/guide_toc_controls';
import { MarkdownBuilderProps } from '~/components/markdown/builder/markdown_builder';
import { useAuth } from '~/hooks/use_auth';
import { useHeadroom } from '~/hooks/use_headroom';
import { useMediaQuery } from '~/hooks/use_media_query';

const MQ_SM = '(max-width: 767px)';

const tocIconClass = 'i-tabler-list-search size-[18px] shrink-0';

interface MarkdownTocProps extends Omit<MarkdownBuilderProps, 'html'> {}

export function MarkdownToc({
	toc,
	slug,
	githubRawUrl,
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
	const [activeId, setActiveId] = useState<string | null>(toc?.[0]?.id ?? null);

	useEffect(() => {
		if (!toc) return;
		const headings = toc.map((item) => document.getElementById(item.id));

		const handleScroll = () => {
			let currentActiveId: string | null = null;

			for (const heading of headings) {
				if (!heading) continue;
				const { top, bottom } = heading.getBoundingClientRect();

				if (bottom > 0 && top < window.innerHeight) {
					currentActiveId = heading.id;
					break;
				}
			}

			if (currentActiveId !== activeId) {
				setActiveId(currentActiveId);
			}
		};

		document.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => document.removeEventListener('scroll', handleScroll);
	}, [toc, activeId]);

	const closeDrawer = () => setOpened(false);

	const items = toc?.map((item) => {
		const baseClasses =
			'min-h-10 flex items-center text-sm leading-snug border-l border-gray-300 dark:border-gray-600 py-1 pr-2 no-underline transition-colors rounded-r-sm pl-4';
		const activeClasses = clsx(
			'font-medium text-blue-600 dark:text-blue-400',
			'bg-gray-50 dark:bg-gray-950/40'
		);
		return (
			<a
				href={`#${item.id}`}
				key={item.id}
				className={clsx(baseClasses, activeId === item.id && activeClasses)}
				onClick={closeDrawer}
			>
				{item.text}
			</a>
		);
	});

	const tocHeader = (
		<div className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
			<span className={tocIconClass} aria-hidden />
			<span>Table des matières</span>
		</div>
	);

	useEffect(() => {
		if (!isMobile) {
			closeDrawer();
		}
	}, [isMobile]);

	const mobileFab = isMobile ? (
		<Button
			variant="outline"
			size="sm"
			onClick={() => setOpened(true)}
			className={clsx(
				'fixed left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 gap-2 bg-gray-50 shadow-md transition-all dark:bg-gray-900',
				pinned ? 'bottom-4' : '-bottom-24'
			)}
		>
			<span className={tocIconClass} aria-hidden />
			<span>Table des matières</span>
		</Button>
	) : null;

	const btnOutline =
		'inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:focus:ring-offset-gray-900';

	return (
		<>
			{!isMobile && (
				<nav
					className="sticky w-[250px] shrink-0 top-[100px]"
					aria-label="Table des matières"
				>
					<div className="mb-4">{tocHeader}</div>
					<div className="flex flex-col gap-0.5">{items}</div>
					{githubRawUrl ? (
						<div className="mt-4 flex w-full flex-col gap-2">
							<ExternalLinkUnstyled
								href={transformRawToGithubUrl(githubRawUrl)}
								className={btnOutline}
							>
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
			<AppDrawer opened={opened} onClose={closeDrawer} title={tocHeader}>
				<div className="flex flex-col gap-0.5">{items}</div>
			</AppDrawer>
			{docReady && mobileFab ? createPortal(mobileFab, document.body) : null}
		</>
	);
}
