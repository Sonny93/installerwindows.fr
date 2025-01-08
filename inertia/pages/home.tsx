import type HomeController from '#controllers/home_controller';
import { InferPageProps } from '@adonisjs/inertia/types';
import { TypographyStylesProvider } from '@mantine/core';
import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import MarkdownTitle from '~/components/markdown/title';
import DefaultLayout from '~/layouts/default_layout';

const MarkdownTitleBuilder = (args: any) => (
	<MarkdownTitle addChapter={() => {}} {...args} />
);

const HomePage = ({ markdown }: InferPageProps<HomeController, 'render'>) => (
	<TypographyStylesProvider>
		<ReactMarkdown
			rehypePlugins={[rehypeRaw]}
			components={{
				h1: MarkdownTitleBuilder,
				h2: MarkdownTitleBuilder,
				h3: MarkdownTitleBuilder,
				h4: MarkdownTitleBuilder,
				h5: MarkdownTitleBuilder,
				h6: MarkdownTitleBuilder,
			}}
		>
			{markdown}
		</ReactMarkdown>
	</TypographyStylesProvider>
);

HomePage.layout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
export default HomePage;
