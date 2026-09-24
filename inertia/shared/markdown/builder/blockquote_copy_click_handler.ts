import { copyText } from '~/shared/markdown/builder/copy_text';
import { getInlineText } from '~/shared/markdown/builder/get_inline_text';
import { COPY_MARKER_ATTRS } from '~/shared/markdown/builder/copy_markers';
import { setInlineCopyFeedback } from '~/shared/markdown/builder/set_inline_copy_feedback';

/**
 * Copies a single-line blockquote's text to the clipboard when clicked, and
 * flashes a success or failure state on it.
 * @param event Delegated click event from the markdown root.
 */
export async function handleBlockquoteClick(event: MouseEvent): Promise<void> {
	const target = event.target;
	if (!(target instanceof HTMLElement)) return;

	const blockquote = target.closest('blockquote');
	if (!blockquote) return;
	if (blockquote.getAttribute(COPY_MARKER_ATTRS.blockquote) !== 'true') return;

	const text = getInlineText(blockquote);
	if (!text) return;

	try {
		await copyText(text);
		setInlineCopyFeedback(blockquote, true);
	} catch {
		setInlineCopyFeedback(blockquote, false);
	}
}
