import { Guide } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { AspectRatio, Card, Image, Text, Tooltip } from '@mantine/core';
import { ClientOnly } from '~/components/generics/client_only';
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
				<Image
					src={guide.thumbnail}
					alt={guide.title}
					className={classes.cardImage}
				/>
			</AspectRatio>
		</Card.Section>

		<Card.Section className={classes.cardSection}>
			<ClientOnly>
				<Text c="dimmed" size="xs">
					{guide.createdAt}
				</Text>
			</ClientOnly>
			<Tooltip label={guide.title}>
				<Text lineClamp={1}>{guide.title}</Text>
			</Tooltip>
		</Card.Section>
	</Card>
);
