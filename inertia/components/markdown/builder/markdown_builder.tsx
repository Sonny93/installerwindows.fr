import type { TocItem } from '#shared/types/index';
import { MarkdownToc } from '~/components/markdown/toc/markdown_toc';

export interface MarkdownBuilderProps {
	html: string;
	toc?: TocItem[];
	slug?: string;
	githubRawUrl?: string;
}

export const MarkdownBuilder = ({
	html,
	toc,
	slug,
	githubRawUrl,
}: Readonly<MarkdownBuilderProps>) => (
	<div className="flex w-full flex-col items-start gap-8 lg:flex-row">
		<div
			className="w-full markdown-body prose prose-lg prose-gray max-w-none min-w-0 flex-1 break-words dark:prose-invert"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
		{toc ? (
			<MarkdownToc toc={toc} slug={slug} githubRawUrl={githubRawUrl} />
		) : null}
	</div>
);
