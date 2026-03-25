const ENHANCED_ATTR = 'data-copy-enhanced';
const COPY_BUTTON_ATTR = 'data-copy-code';
const INLINE_CODE_ATTR = 'data-copy-inline-code';
const BLOCKQUOTE_ATTR = 'data-copy-blockquote';

const copyButtonClassName =
	'absolute top-2 right-2 rounded-md border border-gray-200 bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur transition hover:bg-white dark:border-gray-800 dark:bg-gray-950/80 dark:text-gray-200';

const timeoutsByButton = new WeakMap<
	HTMLButtonElement,
	ReturnType<typeof globalThis.setTimeout>
>();
const timeoutsByInline = new WeakMap<
	HTMLElement,
	ReturnType<typeof globalThis.setTimeout>
>();

function getPreCodeText(pre: HTMLPreElement): string | null {
	const code = pre.querySelector('code');
	if (!code) return null;
	return (code.textContent ?? '').replace(/\n$/, '');
}

function getInlineText(el: HTMLElement): string {
	return (el.textContent ?? '').trim();
}

async function copyText(text: string): Promise<void> {
	if (!globalThis.navigator.clipboard?.writeText)
		throw new Error('clipboard_unavailable');
	await globalThis.navigator.clipboard.writeText(text);
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

function setInlineState(el: HTMLElement, ok: boolean) {
	const okClasses = [
		'bg-emerald-50',
		'text-emerald-900',
		'dark:bg-emerald-950/40',
		'dark:text-emerald-200',
	];
	const failClasses = [
		'bg-red-50',
		'text-red-900',
		'dark:bg-red-950/40',
		'dark:text-red-200',
	];
	const classes = ok ? okClasses : failClasses;

	el.classList.add(...classes);
	const existing = timeoutsByInline.get(el);
	if (existing) globalThis.clearTimeout(existing);

	const timeout = globalThis.setTimeout(
		() => {
			el.classList.remove(...classes);
			timeoutsByInline.delete(el);
		},
		ok ? 900 : 1400
	);

	timeoutsByInline.set(el, timeout);
}

function ensureCopyButtons(root: HTMLElement) {
	const pres = Array.from(root.querySelectorAll('pre'));
	for (const pre of pres) {
		if (pre.getAttribute(ENHANCED_ATTR) === 'true') continue;
		if (!pre.querySelector('code')) continue;

		pre.setAttribute(ENHANCED_ATTR, 'true');
		pre.classList.add('relative');

		const button = document.createElement('button');
		button.type = 'button';
		button.textContent = 'Copy';
		button.setAttribute(COPY_BUTTON_ATTR, 'true');
		button.className = copyButtonClassName;

		pre.appendChild(button);
	}
}

function ensureInlineCodeCopy(root: HTMLElement) {
	const codes = Array.from(root.querySelectorAll('code:not(pre code)'));
	for (const code of codes) {
		if (code.getAttribute(INLINE_CODE_ATTR) === 'true') continue;
		if (!code.textContent?.trim()) continue;

		code.setAttribute(INLINE_CODE_ATTR, 'true');
		code.classList.add('cursor-copy', 'select-all', 'transition-colors');
		code.setAttribute('title', 'Click to copy');
	}
}

function ensureSingleLineBlockquoteCopy(root: HTMLElement) {
	const blockquotes = Array.from(root.querySelectorAll('blockquote'));
	for (const blockquote of blockquotes) {
		if (blockquote.getAttribute(BLOCKQUOTE_ATTR) === 'true') continue;
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

		blockquote.setAttribute(BLOCKQUOTE_ATTR, 'true');
		blockquote.classList.add('cursor-copy', 'select-all', 'transition-colors');
		blockquote.setAttribute('title', 'Click to copy');
	}
}

function isCopyButton(target: EventTarget | null): target is HTMLElement {
	return (
		target instanceof HTMLElement &&
		target.getAttribute(COPY_BUTTON_ATTR) === 'true'
	);
}

function isInlineCode(target: EventTarget | null): target is HTMLElement {
	return (
		target instanceof HTMLElement && target.tagName.toLowerCase() === 'code'
	);
}

export function enhanceMarkdownCopy(root: HTMLElement) {
	ensureCopyButtons(root);
	ensureInlineCodeCopy(root);
	ensureSingleLineBlockquoteCopy(root);
}

export function bindMarkdownCopy(root: HTMLElement) {
	const onPreClick = async (event: MouseEvent) => {
		const target = event.target;
		if (!isCopyButton(target)) return;

		const pre = target.closest('pre');
		if (!pre) return;

		const text = getPreCodeText(pre);
		if (text === null) return;

		try {
			await copyText(text);
			setButtonLabel(target as HTMLButtonElement, 'Copied', 1200);
		} catch {
			setButtonLabel(target as HTMLButtonElement, 'Copy failed', 1600);
		}
	};

	const onInlineCodeClick = async (event: MouseEvent) => {
		const target = event.target;
		if (!isInlineCode(target)) return;
		if (target.closest('pre')) return;
		if (target.getAttribute(INLINE_CODE_ATTR) !== 'true') return;

		const text = getInlineText(target);
		if (!text) return;

		try {
			await copyText(text);
			setInlineState(target, true);
		} catch {
			setInlineState(target, false);
		}
	};

	const onBlockquoteClick = async (event: MouseEvent) => {
		const target = event.target;
		if (!(target instanceof HTMLElement)) return;

		const blockquote = target.closest('blockquote');
		if (!blockquote) return;
		if (blockquote.getAttribute(BLOCKQUOTE_ATTR) !== 'true') return;

		const text = getInlineText(blockquote);
		if (!text) return;

		try {
			await copyText(text);
			setInlineState(blockquote, true);
		} catch {
			setInlineState(blockquote, false);
		}
	};

	root.addEventListener('click', onPreClick);
	root.addEventListener('click', onInlineCodeClick);
	root.addEventListener('click', onBlockquoteClick);

	return () => {
		root.removeEventListener('click', onPreClick);
		root.removeEventListener('click', onInlineCodeClick);
		root.removeEventListener('click', onBlockquoteClick);
	};
}
