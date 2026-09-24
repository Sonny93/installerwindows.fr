import type { TocItem } from '~/components/markdown/toc/toc_item';
import { MarkdownBuilder } from '~/components/markdown/builder/markdown_builder';

interface CGUPageProps {
	html: string;
	toc: TocItem[];
}
const CGUPage = (props: CGUPageProps) => <MarkdownBuilder {...props} />;

export default CGUPage;
