import { MarkdownBuilder } from '~/shared/markdown/builder/markdown_builder';
import type { TocItem } from '~/shared/markdown/toc/toc_item';

interface CGUPageProps {
	html: string;
	toc: TocItem[];
}

export default function CGUPage(props: Readonly<CGUPageProps>) {
	return <MarkdownBuilder {...props} />;
}
