import { discordSuggestionChannelUrl, helpUrl } from '#config/project';
import type { Guides } from '#shared/types/index';
import { Stack, Text, Title } from '@mantine/core';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import { InternalLink } from '~/components/generics/links/internal_link';
import { GuideList } from '~/components/guides/guide_list';
import useUser from '~/hooks/use_user';

interface GuidesPageProps {
	guides: Guides;
}

export default function GuidesPage({ guides }: GuidesPageProps) {
	const { isAuthenticated } = useUser();
	return (
		<Stack align="center" gap="xl">
			<Title order={1}>Guides</Title>
			{guides.length === 0 && <Text>Aucun guide trouvé</Text>}
			{isAuthenticated && (
				<InternalLink href="/guides/new">Ajouter un guide</InternalLink>
			)}
			{guides.length > 0 && <GuideList guides={guides} />}
			<Text style={{ textAlign: 'center' }}>
				Vous souhaitez proposer un nouveau guide ou faire un retour ?<br />
				<ExternalLinkStyled href={helpUrl} target="_blank" rel="noreferrer">
					Rejoignez le serveur Discord
				</ExternalLinkStyled>{' '}
				et faites une proposition dans le salon{' '}
				<ExternalLinkStyled
					href={discordSuggestionChannelUrl}
					target="_blank"
					rel="noreferrer"
				>
					idées-pour-le-serveur
				</ExternalLinkStyled>
				.
			</Text>
		</Stack>
	);
}
