import { useEffect, useRef } from 'react';

import { bindMarkdownCopy } from '~/shared/markdown/builder/bind_markdown_copy';
import { enhanceMarkdownCopy } from '~/shared/markdown/builder/enhance_markdown_copy';
import type { MarkdownBuilderProps } from '~/shared/markdown/builder/markdown_builder_props';
import { MarkdownToc } from '~/shared/markdown/toc/markdown_toc';

export function MarkdownBuilder({
	html,
	toc,
	actions,
}: Readonly<MarkdownBuilderProps>) {
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
			{toc ? <MarkdownToc toc={toc} actions={actions} /> : null}
		</div>
	);
}
