import type HomeController from '#controllers/home_controller';
import { InferPageProps } from '@adonisjs/inertia/types';
import { MarkdownBuilder } from '~/components/markdown/markdown_builder';

const HomePage = ({ html }: InferPageProps<HomeController, 'render'>) => (
	<MarkdownBuilder html={html} />
);

export default HomePage;
