import { TypographyStylesProvider } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { MarkdownTitleBuilder } from '~/components/markdown/title';

interface MarkdownProps {
	markdown: string;
}

export const MarkdownBuilder = ({ markdown }: MarkdownProps) => (
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
