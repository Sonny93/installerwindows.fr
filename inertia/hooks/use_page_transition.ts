import { useEffect, useRef } from 'react';

import { getUrlPathname } from '~/lib/get_url_pathname';
import { restartCssAnimation } from '~/lib/restart_css_animation';
import { InertiaSuccessEvent } from '~/types/inertia_success_event';
import { getCurrentPathAndSearch } from '~/lib/get_current_path_and_search';

const PAGE_TRANSITION_CLASS = 'page-transition-enter';

type Pattern = string | RegExp;

interface UsePageTransitionProps {
	querySelector: string;
	ignorePatterns?: Pattern[];
}

function matchesPattern(path: string, pattern: Pattern): boolean {
	if (pattern instanceof RegExp) {
		return pattern.test(path);
	}
	if (pattern.includes('*') || pattern.includes(':')) {
		const regex = new RegExp(
			'^' + pattern.replace(/\*/g, '.*').replace(/:\w+/g, '[^/]+') + '$'
		);
		return regex.test(path);
	}
	return path === pattern;
}

function shouldIgnoreTransition(to: string, patterns?: Pattern[]): boolean {
	if (!patterns || patterns.length === 0) return false;

	return patterns.some((pattern) => matchesPattern(to, pattern));
}

export const usePageTransition = ({
	querySelector,
	ignorePatterns,
}: UsePageTransitionProps): void => {
	const previousUrlRef = useRef<string>(
		getUrlPathname(getCurrentPathAndSearch())
	);

	useEffect(() => {
		const handleSuccess = (event: Event) => {
			const element = document.querySelector<HTMLElement>(querySelector);
			if (!element) return;

			const { detail } = event as InertiaSuccessEvent;
			const nextUrlRaw = detail?.page?.url ?? getCurrentPathAndSearch();

			const next = getUrlPathname(nextUrlRaw);
			const prev = getUrlPathname(previousUrlRef.current);
			if (next === prev) return;

			if (shouldIgnoreTransition(next, ignorePatterns)) {
				previousUrlRef.current = next;
				return;
			}

			previousUrlRef.current = next;
			restartCssAnimation(element, PAGE_TRANSITION_CLASS);

			const onEnd = () => {
				element.classList.remove(PAGE_TRANSITION_CLASS);
				element.removeEventListener('animationend', onEnd);
			};
			element.addEventListener('animationend', onEnd);
		};

		document.addEventListener('inertia:success', handleSuccess);
		return () => document.removeEventListener('inertia:success', handleSuccess);
	}, [querySelector, ignorePatterns]);
};
