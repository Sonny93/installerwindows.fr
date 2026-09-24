import { copyText } from '~/components/markdown/builder/copy_text';
import { COPY_MARKER_ATTRS } from '~/components/markdown/builder/copy_markers';

const COPIED_LABEL_MS = 1200;
const COPY_FAILED_LABEL_MS = 1600;

const timeoutsByButton = new WeakMap<
	HTMLButtonElement,
	ReturnType<typeof globalThis.setTimeout>
>();

function getPreCodeText(pre: HTMLPreElement): string | null {
	const code = pre.querySelector('code');
	if (!code) return null;
	return (code.textContent ?? '').replace(/\n$/, '');
}

function setButtonLabel(button: HTMLButtonElement, label: string, ms: number) {
	button.textContent = label;
	const existing = timeoutsByButton.get(button);
	if (existing) globalThis.clearTimeout(existing);

	const timeout = globalThis.setTimeout(() => {
		button.textContent = 'Copy';
		timeoutsByButton.delete(button);
	}, ms);

	timeoutsByButton.set(button, timeout);
}

function isCopyButton(target: EventTarget | null): target is HTMLButtonElement {
	return (
		target instanceof HTMLElement &&
		target.getAttribute(COPY_MARKER_ATTRS.copyButton) === 'true'
	);
}

/**
 * Copies a code block's text to the clipboard when the click landed on its
 * generated copy button, and reflects the outcome on the button's label.
 * @param event Delegated click event from the markdown root.
 */
export async function handlePreClick(event: MouseEvent): Promise<void> {
	const target = event.target;
	if (!isCopyButton(target)) return;

	const pre = target.closest('pre');
	if (!pre) return;

	const text = getPreCodeText(pre);
	if (text === null) return;

	try {
		await copyText(text);
		setButtonLabel(target, 'Copied', COPIED_LABEL_MS);
	} catch {
		setButtonLabel(target, 'Copy failed', COPY_FAILED_LABEL_MS);
	}
}
