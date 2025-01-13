import { TocItem } from '#shared/types/index';
import { MarkdownBuilder } from '~/components/markdown/builder/markdown_builder';

interface CGUPageProps {
	html: string;
	toc: TocItem[];
}
const CGUPage = (props: CGUPageProps) => <MarkdownBuilder {...props} />;

export default CGUPage;
