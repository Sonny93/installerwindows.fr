import { Guides } from '#shared/types/index';
import { Flex } from '@mantine/core';
import { GuideCard } from '~/components/guides/guide_card';

interface GuideListProps {
	guides: Guides;
}

export const GuideList = ({ guides }: GuideListProps) => (
	<Flex gap="xs">
		{guides.map((guide) => (
			<GuideCard guide={guide} />
		))}
	</Flex>
);
