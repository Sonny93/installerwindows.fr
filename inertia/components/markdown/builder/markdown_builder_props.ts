import type { TocItem } from '~/components/markdown/toc/toc_item';

export interface MarkdownBuilderProps {
	html: string;
	toc?: TocItem[];
	slug?: string;
	githubUrl?: string;
}
