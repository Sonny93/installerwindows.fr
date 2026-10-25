import { handleBlockquoteClick } from '~/shared/markdown/builder/blockquote_copy_click_handler';
import { handleInlineCodeClick } from '~/shared/markdown/builder/inline_code_click_handler';
import { handlePreClick } from '~/shared/markdown/builder/pre_copy_click_handler';

/**
 * Wires the click-to-copy handlers onto `root` via delegated listeners so
 * they keep working as the markdown content is re-rendered.
 * @param root Rendered markdown container to bind listeners to.
 * @returns Cleanup function that removes the listeners.
 */
export function bindMarkdownCopy(root: HTMLElement): () => void {
	const onPreClick = (event: MouseEvent): void => {
		void handlePreClick(event);
	};

	const onInlineCodeClick = (event: MouseEvent): void => {
		void handleInlineCodeClick(event);
	};

	const onBlockquoteClick = (event: MouseEvent): void => {
		void handleBlockquoteClick(event);
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
