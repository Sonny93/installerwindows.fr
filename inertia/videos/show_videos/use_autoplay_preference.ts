import { useCallback, useSyncExternalStore } from 'react';

const AUTOPLAY_STORAGE_KEY = 'videos.autoplay';
const AUTOPLAY_ENABLED_STORAGE_VALUE = 'true';

const autoplayChangeListeners = new Set<() => void>();

function notifyAutoplayChangeListeners(): void {
	for (const listener of autoplayChangeListeners) listener();
}

function readIsAutoplayEnabledSafely(): boolean {
	try {
		return (
			window.localStorage.getItem(AUTOPLAY_STORAGE_KEY) ===
			AUTOPLAY_ENABLED_STORAGE_VALUE
		);
	} catch {
		return false;
	}
}

function writeIsAutoplayEnabledSafely(isEnabled: boolean): void {
	try {
		if (isEnabled) {
			window.localStorage.setItem(
				AUTOPLAY_STORAGE_KEY,
				AUTOPLAY_ENABLED_STORAGE_VALUE
			);
		} else {
			window.localStorage.removeItem(AUTOPLAY_STORAGE_KEY);
		}
	} catch {
		return;
	}
}

function subscribeToAutoplayPreference(onStoreChange: () => void): () => void {
	autoplayChangeListeners.add(onStoreChange);
	window.addEventListener('storage', onStoreChange);
	return () => {
		autoplayChangeListeners.delete(onStoreChange);
		window.removeEventListener('storage', onStoreChange);
	};
}

const getServerAutoplayPreference = () => false;

export interface UseAutoplayPreferenceReturn {
	isAutoplayEnabled: boolean;
	setAutoplayEnabled: (isEnabled: boolean) => void;
}

export function useAutoplayPreference(): UseAutoplayPreferenceReturn {
	const isAutoplayEnabled = useSyncExternalStore(
		subscribeToAutoplayPreference,
		readIsAutoplayEnabledSafely,
		getServerAutoplayPreference
	);

	const setAutoplayEnabled = useCallback((isEnabled: boolean) => {
		writeIsAutoplayEnabledSafely(isEnabled);
		notifyAutoplayChangeListeners();
	}, []);

	return { isAutoplayEnabled, setAutoplayEnabled };
}
