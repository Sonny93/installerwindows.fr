const OK_CLASSES = [
	'bg-emerald-50',
	'text-emerald-900',
	'dark:bg-emerald-950/40',
	'dark:text-emerald-200',
];
const FAIL_CLASSES = [
	'bg-red-50',
	'text-red-900',
	'dark:bg-red-950/40',
	'dark:text-red-200',
];
const OK_FEEDBACK_MS = 900;
const FAIL_FEEDBACK_MS = 1400;

const timeoutsByElement = new WeakMap<
	HTMLElement,
	ReturnType<typeof globalThis.setTimeout>
>();

/**
 * Briefly highlights an inline-copyable element (inline code or a single-line
 * blockquote) to confirm whether the copy attempt succeeded.
 * @param element Element that was clicked to copy its text.
 * @param ok Whether the copy attempt succeeded.
 */
export function setInlineCopyFeedback(element: HTMLElement, ok: boolean): void {
	const classes = ok ? OK_CLASSES : FAIL_CLASSES;

	element.classList.add(...classes);
	const existing = timeoutsByElement.get(element);
	if (existing) globalThis.clearTimeout(existing);

	const timeout = globalThis.setTimeout(
		() => {
			element.classList.remove(...classes);
			timeoutsByElement.delete(element);
		},
		ok ? OK_FEEDBACK_MS : FAIL_FEEDBACK_MS
	);

	timeoutsByElement.set(element, timeout);
}
