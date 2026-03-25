import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query: string, initialState = false) {
	const subscribe = useCallback(
		(onChange: () => void) => {
			const m = window.matchMedia(query);
			m.addEventListener('change', onChange);
			return () => m.removeEventListener('change', onChange);
		},
		[query]
	);
	const getSnapshot = () => window.matchMedia(query).matches;
	const getServerSnapshot = () => initialState;
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
