import { urlify } from '#shared/utils/index';
import { Stack, Text, Title, TypographyStylesProvider } from '@mantine/core';

interface VideoMetaProps {
	title: string;
	description: string;
	publishedAt: string;
}

export const VideoMeta = ({
	title,
	description,
	publishedAt,
}: VideoMetaProps) => (
	<>
		<Stack gap={0}>
			<Text c="dimmed" size="sm">
				{publishedAt}
			</Text>
			<Title size="h2">{title}</Title>
		</Stack>
		<TypographyStylesProvider
			style={{ whiteSpace: 'pre-wrap' }}
			dangerouslySetInnerHTML={{ __html: urlify(description) }}
		/>
	</>
);
