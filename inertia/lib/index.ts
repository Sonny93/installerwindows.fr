export function getCurrentPathAndSearch(): string {
	if (typeof window === 'undefined') return '';
	return `${window.location.pathname}${window.location.search}`;
}

export function getPathAndSearchFromRaw(rawUrl: string): string {
	try {
		const url = new URL(rawUrl, window.location.origin);
		return `${url.pathname}${url.search}`;
	} catch {
		return rawUrl;
	}
}

export function restartCssAnimation(
	element: HTMLElement,
	className: string
): void {
	element.classList.remove(className);
	// Force reflow to ensure animation restarts when re-adding the class
	void element.offsetWidth;
	element.classList.add(className);
}
