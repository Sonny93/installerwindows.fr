import { Link } from '@adonisjs/inertia/react';
import { Data } from '@generated/data';
import { AspectRatio, Card, Image, Text, Tooltip } from '@mantine/core';
import classes from './guide_card.module.css';

interface GuideCardProps {
	guide: Data.Guide;
}

export const GuideCard = ({ guide }: Readonly<GuideCardProps>) => (
	<Card
		component={Link}
		href={`/guides/${guide.slug}`}
		className={classes.card}
	>
		<Card.Section>
			<AspectRatio ratio={16 / 9} className={classes.cardImage}>
				<Image src={guide.thumbnail} alt={guide.title} />
			</AspectRatio>
		</Card.Section>

		<Card.Section className={classes.cardSection}>
			<Text c="dimmed" size="xs">
				{guide.createdAt}
			</Text>
			<Tooltip label={guide.title}>
				<Text lineClamp={1}>{guide.title}</Text>
			</Tooltip>
		</Card.Section>
	</Card>
);
