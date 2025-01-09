import { Videos } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Card, Image, Stack, Text } from '@mantine/core';

interface VideoListProps {
	videos: Videos;
	activeVideoId?: string;
}

export const VideoList = ({ videos, activeVideoId }: VideoListProps) => (
	<Stack align="center" w="100%">
		{videos.map(({ id, title, thumbnail }) => (
			<Card
				radius="md"
				p="md"
				key={id}
				w="100%"
				maw={600}
				bg="transparent"
				withBorder
				component={Link}
				href={`/videos/${id}`}
				style={{
					border:
						activeVideoId === id
							? '1px solid var(--mantine-color-blue-5)'
							: '1px solid var(--mantine-color-gray-8)',
				}}
			>
				<Card.Section>
					<Image src={thumbnail} alt={title} height="auto" />
				</Card.Section>

				<Card.Section
					style={{
						paddingBlock: 'var(--mantine-spacing-md)',
						paddingInline: 'var(--mantine-spacing-sm)',
					}}
				>
					<Text style={{ textAlign: 'center' }}>{title}</Text>
				</Card.Section>
			</Card>
		))}
	</Stack>
);
