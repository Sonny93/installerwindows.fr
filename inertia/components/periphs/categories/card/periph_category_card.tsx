import { Link } from '@inertiajs/react';
import { AspectRatio, Card, Image, Text, Tooltip } from '@mantine/core';
import classes from './periph_category_card.module.css';

type PeriphCategory = {
	id: string;
	name: string;
	thumbnail: string;
	total_periphs: number;
};
interface PeriphCategoryCardProps extends PeriphCategory {}
export function PeriphCategoryCard({
	id,
	name,
	thumbnail,
	total_periphs,
}: PeriphCategoryCardProps) {
	return (
		<Card
			component={Link}
			href={`/periphs/categories/${id}`}
			className={classes.card}
		>
			<Card.Section>
				<AspectRatio ratio={16 / 9} className={classes.cardImage}>
					<Image src={thumbnail} alt={name} style={{ height: '100%' }} />
				</AspectRatio>
			</Card.Section>

			<Card.Section className={classes.cardSection}>
				<Text c="dimmed" size="xs">
					{total_periphs} periphériques
				</Text>
				<Tooltip label={name}>
					<Text lineClamp={1}>{name}</Text>
				</Tooltip>
			</Card.Section>
		</Card>
	);
}
