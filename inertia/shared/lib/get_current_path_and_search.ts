export function getCurrentPathAndSearch(): string {
	if (typeof window === 'undefined') return '';
	return `${window.location.pathname}${window.location.search}`;
}
