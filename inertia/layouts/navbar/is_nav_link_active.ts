import { getUrlPathname } from '~/shared/lib/get_url_pathname';

export function isNavLinkActive(currentPath: string, href: string): boolean {
	const normalizedCurrentPath = getUrlPathname(currentPath);
	const normalizedHref = getUrlPathname(href);

	if (normalizedCurrentPath === normalizedHref) return true;

	return normalizedCurrentPath.startsWith(`${normalizedHref}/`);
}
