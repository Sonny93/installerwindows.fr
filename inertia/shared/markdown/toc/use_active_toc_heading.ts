import { useEffect, useState } from 'react';

import type { TocItem } from '~/shared/markdown/toc/toc_item';

export function useActiveTocHeading(toc: TocItem[] | undefined): string | null {
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

	return activeId;
}
