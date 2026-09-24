import { COPY_MARKER_ATTRS } from '~/shared/markdown/builder/copy_markers';

const copyButtonClassName =
	'absolute top-2 right-2 rounded-md border border-gray-200 bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur transition hover:bg-white dark:border-gray-800 dark:bg-gray-950/80 dark:text-gray-200';

function ensureCopyButtons(root: HTMLElement): void {
	const pres = Array.from(root.querySelectorAll('pre'));
	for (const pre of pres) {
		if (pre.getAttribute(COPY_MARKER_ATTRS.enhanced) === 'true') continue;
		if (!pre.querySelector('code')) continue;

		pre.setAttribute(COPY_MARKER_ATTRS.enhanced, 'true');
		pre.classList.add('relative');

		const button = document.createElement('button');
		button.type = 'button';
		button.textContent = 'Copy';
		button.setAttribute(COPY_MARKER_ATTRS.copyButton, 'true');
		button.className = copyButtonClassName;

		pre.appendChild(button);
	}
}

function ensureInlineCodeCopy(root: HTMLElement): void {
	const codes = Array.from(root.querySelectorAll('code:not(pre code)'));
	for (const code of codes) {
		if (code.getAttribute(COPY_MARKER_ATTRS.inlineCode) === 'true') continue;
		if (!code.textContent?.trim()) continue;

		code.setAttribute(COPY_MARKER_ATTRS.inlineCode, 'true');
		code.classList.add('cursor-copy', 'select-all', 'transition-colors');
		code.setAttribute('title', 'Click to copy');
	}
}

function ensureSingleLineBlockquoteCopy(root: HTMLElement): void {
	const blockquotes = Array.from(root.querySelectorAll('blockquote'));
	for (const blockquote of blockquotes) {
		if (blockquote.getAttribute(COPY_MARKER_ATTRS.blockquote) === 'true')
			continue;
		if (
			blockquote.querySelector(
				'pre, code, ul, ol, table, h1, h2, h3, h4, h5, h6'
			)
		)
			continue;

		const paragraphs = blockquote.querySelectorAll('p');
		if (paragraphs.length !== 1) continue;

		const text = (blockquote.textContent ?? '').trim();
		if (!text) continue;
		if (text.includes('\n')) continue;

		blockquote.setAttribute(COPY_MARKER_ATTRS.blockquote, 'true');
		blockquote.classList.add('cursor-copy', 'select-all', 'transition-colors');
		blockquote.setAttribute('title', 'Click to copy');
	}
}

/**
 * Marks every code block, inline code snippet, and single-line blockquote
 * inside `root` as click-to-copy, idempotently — elements already marked
 * from a previous call are skipped.
 * @param root Rendered markdown container to scan.
 */
export function enhanceMarkdownCopy(root: HTMLElement): void {
	ensureCopyButtons(root);
	ensureInlineCodeCopy(root);
	ensureSingleLineBlockquoteCopy(root);
}
