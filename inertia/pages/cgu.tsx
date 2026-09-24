import type { TocItem } from '~/components/markdown/toc/toc_item';
import { MarkdownBuilder } from '~/components/markdown/builder/markdown_builder';

interface CGUPageProps {
	html: string;
	toc: TocItem[];
}

export default function CGUPage(props: Readonly<CGUPageProps>) {
	return <MarkdownBuilder {...props} />;
}
