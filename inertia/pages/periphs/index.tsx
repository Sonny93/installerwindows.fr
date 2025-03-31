import { discordSuggestionChannelUrl, helpUrl } from '#config/project';
import { CountPerCategory } from '#shared/types/index';
import { Group, Stack, Text, Title } from '@mantine/core';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import { ProductCategoryList } from '~/components/products/categories/product_category_list';

interface PeriphsProps {
	count: CountPerCategory;
}

export default function Periphs(props: PeriphsProps) {
	return (
		<Stack gap="xl">
			<Stack gap="xs">
				<Group justify="space-between">
					<Title order={1} style={{ lineHeight: 1.2 }}>
						Periphériques
					</Title>
				</Group>
				<Text c="gray.6">
					Vous souhaitez proposer de nouveaux périphériques ou demander des
					conseils ?<br />
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
			<ProductCategoryList count={props.count} />
		</Stack>
	);
}
