import type HomeController from '#controllers/home_controller';
import { InferPageProps } from '@adonisjs/inertia/types';
import { MarkdownBuilder } from '~/components/markdown/markdown_builder';

const HomePage = ({ markdown }: InferPageProps<HomeController, 'render'>) => (
	<MarkdownBuilder markdown={markdown} />
);

export default HomePage;
