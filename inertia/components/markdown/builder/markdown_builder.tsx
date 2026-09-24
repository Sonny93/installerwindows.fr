import { useEffect, useRef } from 'react';

import type { TocItem } from '~/components/markdown/toc/toc_item';
import { MarkdownToc } from '~/components/markdown/toc/markdown_toc';
import {
	bindMarkdownCopy,
	enhanceMarkdownCopy,
} from './markdown_copy_enhancer';

export interface MarkdownBuilderProps {
	html: string;
	toc?: TocItem[];
	slug?: string;
	githubUrl?: string;
}

export const MarkdownBuilder = ({
	html,
	toc,
	slug,
	githubUrl,
}: Readonly<MarkdownBuilderProps>) => {
	const rootRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		enhanceMarkdownCopy(root);
		return bindMarkdownCopy(root);
	}, [html]);

	return (
		<div className="flex w-full flex-col items-start gap-8 lg:flex-row">
			<div
				ref={rootRef}
				className="w-full markdown-body prose prose-lg prose-gray max-w-none min-w-0 flex-1 break-words dark:prose-invert"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
			{toc ? <MarkdownToc toc={toc} slug={slug} githubUrl={githubUrl} /> : null}
		</div>
	);
};
