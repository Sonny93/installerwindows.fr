import { TocItem } from '#shared/types/index';
import { MarkdownBuilder } from '~/components/markdown/markdown_builder';

interface ShowGuidePageProps {
	html: string;
	toc: TocItem[];
	slug: string;
	githubRawUrl: string;
}

const ShowGuidePage = (props: ShowGuidePageProps) => (
	<MarkdownBuilder {...props} />
);

export default ShowGuidePage;
