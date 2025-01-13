import { Guide } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Card, Image, Text, Tooltip } from '@mantine/core';

interface GuideCardProps {
	guide: Guide;
}
export const GuideCard = ({ guide }: GuideCardProps) => (
	<Card
		radius="md"
		p="md"
		key={guide.id}
		w={350}
		bg="transparent"
		withBorder
		component={Link}
		href={`/guides/${guide.slug}`}
	>
		<Card.Section>
			<Image src={guide.thumbnail} alt={guide.title} height="auto" />
		</Card.Section>

		<Card.Section p="sm">
			<Tooltip label={guide.title}>
				<Text style={{ textAlign: 'center' }} lineClamp={1}>
					{guide.title}
				</Text>
			</Tooltip>
		</Card.Section>
	</Card>
);
