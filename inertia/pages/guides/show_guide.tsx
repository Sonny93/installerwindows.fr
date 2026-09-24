import type { TocItem } from '~/shared/markdown/toc/toc_item';
import { GuideTocActions } from '~/guides/show_guide/guide_toc_actions';
import { MarkdownBuilder } from '~/shared/markdown/builder/markdown_builder';

interface ShowGuidePageProps {
	html: string;
	toc: TocItem[];
	slug: string;
	githubUrl: string;
}

export default function ShowGuidePage({
	html,
	toc,
	slug,
	githubUrl,
}: Readonly<ShowGuidePageProps>) {
	return (
		<MarkdownBuilder
			html={html}
			toc={toc}
			actions={<GuideTocActions slug={slug} githubUrl={githubUrl} />}
		/>
	);
}
