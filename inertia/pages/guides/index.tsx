import type { Guides } from '#shared/types/index';
import { Stack, Text, Title } from '@mantine/core';
import { InternalLink } from '~/components/generics/links/internal_link';
import { GuideList } from '~/components/guides/guide_list';
import useUser from '~/hooks/use_user';

interface GuidesPageProps {
	guides: Guides;
}

export default function GuidesPage({ guides }: GuidesPageProps) {
	const { isAuthenticated } = useUser();
	return (
		<Stack>
			<Title order={1}>Guides</Title>
			{guides.length === 0 && <Text>Aucun guide trouvé</Text>}
			{guides.length > 0 && <GuideList guides={guides} />}
			{isAuthenticated && (
				<InternalLink href="/guides/new">Ajouter un guide</InternalLink>
			)}
		</Stack>
	);
}
