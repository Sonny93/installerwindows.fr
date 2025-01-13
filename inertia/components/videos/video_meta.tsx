import { urlify } from '#shared/utils/index';
import { Title, TypographyStylesProvider } from '@mantine/core';

interface VideoMetaProps {
	title: string;
	description: string;
}

export const VideoMeta = ({ title, description }: VideoMetaProps) => (
	<>
		<Title size="h2">
			{title}
		</Title>
		<TypographyStylesProvider
			style={{ whiteSpace: 'pre-wrap' }}
			dangerouslySetInnerHTML={{ __html: urlify(description) }}
		/>
	</>
);
