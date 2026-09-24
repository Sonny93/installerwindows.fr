export function getUrlPathname(rawUrl: string): string {
	try {
		const url = new URL(rawUrl, window.location.origin);
		return url.pathname;
	} catch {
		return rawUrl;
	}
}
