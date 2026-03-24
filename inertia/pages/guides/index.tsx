import type { Guides } from '#shared/types/index';
import { Link } from '@adonisjs/inertia/react';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import { GuideList } from '~/components/guides/guide_list';
import { DISCORD_SUGGESTION_CHANNEL_URL, HELP_URL } from '~/consts/project';
import useUser from '~/hooks/use_user';

interface GuidesPageProps {
	guides: Guides;
}

export default function GuidesPage({ guides }: GuidesPageProps) {
	const { isAuthenticated } = useUser();
	return (
		<Stack gap="xl">
			<Stack gap="xs">
				<Group justify="space-between">
					<Title order={1} style={{ lineHeight: 1.2 }}>
						Guides
					</Title>
					{isAuthenticated && (
						<Button component={Link} href="/guides/new">
							Ajouter un guide
						</Button>
					)}
				</Group>
				<Text c="gray.6">
					Vous souhaitez proposer un nouveau guide ou faire un retour ?<br />
					<ExternalLinkStyled href={HELP_URL} target="_blank" rel="noreferrer">
						Rejoignez le serveur Discord
					</ExternalLinkStyled>{' '}
					et faites une proposition dans le salon{' '}
					<ExternalLinkStyled
						href={DISCORD_SUGGESTION_CHANNEL_URL}
						target="_blank"
						rel="noreferrer"
					>
						idées-pour-le-serveur
					</ExternalLinkStyled>
					.
				</Text>
			</Stack>
			{guides.length === 0 && <Text>Aucun guide trouvé</Text>}
			{guides.length > 0 && <GuideList guides={guides} />}
		</Stack>
	);
}
