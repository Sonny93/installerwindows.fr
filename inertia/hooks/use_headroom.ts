import { useEffect, useRef, useState } from 'react';

export function useHeadroom({ fixedAt }: { fixedAt: number }) {
	const [pinned, setPinned] = useState(true);
	const lastScrollY = useRef(0);

	useEffect(() => {
		lastScrollY.current = window.scrollY;
		const onScroll = () => {
			const y = window.scrollY;
			if (y < fixedAt) {
				setPinned(true);
			} else if (y > lastScrollY.current) {
				setPinned(false);
			} else {
				setPinned(true);
			}
			lastScrollY.current = y;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	}, [fixedAt]);

	return pinned;
}
