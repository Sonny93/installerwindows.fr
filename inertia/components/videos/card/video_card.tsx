import { Video } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { AspectRatio, Card, Image, Text, Tooltip } from '@mantine/core';
import classes from './video_card.module.css';

interface VideoCardProps extends Video {
	activeVideoId?: string;
}

export const VideoCard = ({
	id,
	title,
	thumbnail,
	publishedAt,
	activeVideoId,
}: VideoCardProps) => (
	<Card
		component={Link}
		href={`/videos/${id}`}
		className={classes.card}
		data-active={activeVideoId === id}
		key={id}
	>
		<Card.Section>
			<AspectRatio ratio={16 / 9} className={classes.cardImage}>
				<Image src={thumbnail} alt={title} />
			</AspectRatio>
		</Card.Section>

		<Card.Section className={classes.cardSection}>
			<Text c="dimmed" size="xs">
				{publishedAt}
			</Text>
			<Tooltip label={title}>
				<Text lineClamp={1}>{title}</Text>
			</Tooltip>
		</Card.Section>
	</Card>
);
