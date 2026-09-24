/**
 * Data attribute names used to mark elements once the copy-to-clipboard
 * enhancement has been applied, and to recognize them again when a click
 * bubbles up to the root's delegated listeners.
 */
export const COPY_MARKER_ATTRS = {
	enhanced: 'data-copy-enhanced',
	copyButton: 'data-copy-code',
	inlineCode: 'data-copy-inline-code',
	blockquote: 'data-copy-blockquote',
} as const;
