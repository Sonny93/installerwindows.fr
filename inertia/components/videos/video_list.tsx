import { Videos } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Card, Image, Stack, Text } from '@mantine/core';

interface VideoListProps {
	videos: Videos;
}

export const VideoList = ({ videos }: VideoListProps) => (
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
			>
				<Card.Section>
					<Image src={thumbnail} alt={title} height="auto" />
				</Card.Section>

				<Card.Section p="xs">
					<Text style={{ textAlign: 'center' }}>{title}</Text>
				</Card.Section>
			</Card>
		))}
	</Stack>
);
