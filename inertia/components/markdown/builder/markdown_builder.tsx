import { useEffect, useRef } from 'react';

import { MarkdownToc } from '~/components/markdown/toc/markdown_toc';
import { bindMarkdownCopy } from '~/components/markdown/builder/bind_markdown_copy';
import { enhanceMarkdownCopy } from '~/components/markdown/builder/enhance_markdown_copy';
import type { MarkdownBuilderProps } from '~/components/markdown/builder/markdown_builder_props';

export function MarkdownBuilder({
	html,
	toc,
	slug,
	githubUrl,
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
			{toc ? <MarkdownToc toc={toc} slug={slug} githubUrl={githubUrl} /> : null}
		</div>
	);
}
