import { copyText } from '~/shared/markdown/builder/copy_text';
import { getInlineText } from '~/shared/markdown/builder/get_inline_text';
import { COPY_MARKER_ATTRS } from '~/shared/markdown/builder/copy_markers';
import { setInlineCopyFeedback } from '~/shared/markdown/builder/set_inline_copy_feedback';

function isInlineCode(target: EventTarget | null): target is HTMLElement {
	return (
		target instanceof HTMLElement && target.tagName.toLowerCase() === 'code'
	);
}

/**
 * Copies an inline code snippet's text to the clipboard when clicked, and
 * flashes a success or failure state on it.
 * @param event Delegated click event from the markdown root.
 */
export async function handleInlineCodeClick(event: MouseEvent): Promise<void> {
	const target = event.target;
	if (!isInlineCode(target)) return;
	if (target.closest('pre')) return;
	if (target.getAttribute(COPY_MARKER_ATTRS.inlineCode) !== 'true') return;

	const text = getInlineText(target);
	if (!text) return;

	try {
		await copyText(text);
		setInlineCopyFeedback(target, true);
	} catch {
		setInlineCopyFeedback(target, false);
	}
}
