import { TocItem } from '#shared/types/index';
import { Flex, Typography } from '@mantine/core';
import { MarkdownToc } from '~/components/markdown/toc/markdown_toc';
import './markdown.css';

export interface MarkdownBuilderProps {
	html: string;
	toc?: TocItem[];
	slug?: string;
	githubRawUrl?: string;
}

export const MarkdownBuilder = ({
	html,
	toc,
	slug,
	githubRawUrl,
}: MarkdownBuilderProps) => (
	<Flex align="flex-start" gap="xl" w="100%">
		<Typography
			style={{ width: 0, flex: 1, lineHeight: 1.5 }}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
		{toc && <MarkdownToc toc={toc} slug={slug} githubRawUrl={githubRawUrl} />}
	</Flex>
);
