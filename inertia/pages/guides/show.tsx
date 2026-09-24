import type { TocItem } from '~/components/markdown/toc/toc_item';
import { MarkdownBuilder } from '~/components/markdown/builder/markdown_builder';

interface ShowGuidePageProps {
	html: string;
	toc: TocItem[];
	slug: string;
	githubUrl: string;
}

const ShowGuidePage = (props: ShowGuidePageProps) => (
	<MarkdownBuilder {...props} />
);

export default ShowGuidePage;
