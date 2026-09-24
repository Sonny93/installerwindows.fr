import { MarkdownBuilder } from '~/shared/markdown/builder/markdown_builder';

interface HomePageProps {
	html: string;
}

export default function HomePage({ html }: Readonly<HomePageProps>) {
	return <MarkdownBuilder html={html} />;
}
