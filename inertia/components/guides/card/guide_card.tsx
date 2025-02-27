import { Guide } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { AspectRatio, Card, Image, Text, Tooltip } from '@mantine/core';
import classes from './guide_card.module.css';

interface GuideCardProps {
	guide: Guide;
}
export const GuideCard = ({ guide }: GuideCardProps) => (
	<Card
		component={Link}
		href={`/guides/${guide.slug}`}
		className={classes.card}
	>
		<Card.Section>
			<AspectRatio ratio={16 / 9}>
				<Image src={guide.thumbnail} alt={guide.title} radius="md" />
			</AspectRatio>
		</Card.Section>

		<Card.Section className={classes.cardSection}>
			<Tooltip label={guide.title}>
				<Text className={classes.cardTitle} lineClamp={1}>
					{guide.title}
				</Text>
			</Tooltip>
		</Card.Section>
	</Card>
);
