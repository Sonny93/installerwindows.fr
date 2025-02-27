import { Guide } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { AspectRatio, Card, Image, Text, Tooltip } from '@mantine/core';

interface GuideCardProps {
	guide: Guide;
}
export const GuideCard = ({ guide }: GuideCardProps) => (
	<Card
		p="md"
		w={350}
		bg="transparent"
		component={Link}
		href={`/guides/${guide.slug}`}
	>
		<Card.Section>
			<AspectRatio ratio={16 / 9}>
				<Image src={guide.thumbnail} alt={guide.title} radius="md" />
			</AspectRatio>
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
