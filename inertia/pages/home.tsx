import type HomeController from '#controllers/home_controller';
import { InferPageProps } from '@adonisjs/inertia/types';
import { MarkdownBuilder } from '~/components/markdown/markdown_builder';

const HomePage = ({ html, toc }: InferPageProps<HomeController, 'render'>) => (
	<MarkdownBuilder html={html} toc={toc} />
);

export default HomePage;
