import { MarkdownBuilder } from '~/components/markdown/builder/markdown_builder';

interface HomePageProps {
	html: string;
}

const HomePage = ({ html }: HomePageProps) => <MarkdownBuilder html={html} />;

export default HomePage;
