import { Guides } from '#shared/types/index';
import { Flex } from '@mantine/core';
import { GuideCard } from '~/components/guides/card/guide_card';

interface GuideListProps {
	guides: Guides;
}

export const GuideList = ({ guides }: GuideListProps) => (
	<Flex gap="md" wrap="wrap" justify="center">
		{guides.map((guide) => (
			<GuideCard key={guide.id} guide={guide} />
		))}
	</Flex>
);
