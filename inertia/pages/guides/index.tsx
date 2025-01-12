import type { Guides } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Card, Flex, Image, Stack, Text, Title, Tooltip } from '@mantine/core';
import { InternalLink } from '~/components/generics/links/internal_link';
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
			{guides.length > 0 && (
				<Flex gap="xs">
					{guides.map(({ id, slug, title, thumbnail }) => (
						<Card
							radius="md"
							p="md"
							key={id}
							w={350}
							bg="transparent"
							withBorder
							component={Link}
							href={`/guides/${slug}`}
						>
							<Card.Section>
								<Image src={thumbnail} alt={title} height="auto" />
							</Card.Section>

							<Card.Section p="sm">
								<Tooltip label={title}>
									<Text style={{ textAlign: 'center' }} lineClamp={1}>
										{title}
									</Text>
								</Tooltip>
							</Card.Section>
						</Card>
					))}
				</Flex>
			)}
			{isAuthenticated && (
				<InternalLink href="/guides/new">Ajouter un guide</InternalLink>
			)}
		</Stack>
	);
}
