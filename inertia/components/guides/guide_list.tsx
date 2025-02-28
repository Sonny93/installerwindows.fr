import { Guides } from '#shared/types/index';
import { SimpleGrid } from '@mantine/core';
import { GuideCard } from '~/components/guides/card/guide_card';

interface GuideListProps {
	guides: Guides;
}

export const GuideList = ({ guides }: GuideListProps) => (
	<SimpleGrid cols={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }} spacing="lg">
		{guides.map((guide) => (
			<GuideCard key={guide.id} guide={guide} />
		))}
	</SimpleGrid>
);
