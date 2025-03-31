import { discordSuggestionChannelUrl, helpUrl } from '#config/project';
import { CountPerCategory } from '#shared/types/index';
import { Accordion, Box, Group, Stack, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import { ProductCategoryList } from '~/components/products/categories/product_category_list';

interface PeriphsProps {
	count: CountPerCategory;
}

const FAQ = [
	{
		question: "Pourquoi il n'y a pas X périphérique ?",
		answer:
			"Soit parce que le périphérique dont tu parles est naze, soit parce que je pense pas à tout. Si y'a quelque chose que tu connais qui mérite sa place dans la liste, hésite pas à me DM quelque part",
	},
	{
		question: 'On pourrait rajouter X catégorie ?',
		answer:
			"Pareil, DM moi ce que tu voudrais voir, et on va voir si c'est possible de faire un truc bien.",
	},
	{
		question: "Pourquoi y'a des sites spécifiques qui sont linkés ?",
		answer: (
			<>
				En tant que Partenaire Amazon, je réalise un bénéfice sur les achats
				remplissant les conditions requises. Je t'encourage tout de même{' '}
				<b>fortement</b> à utiliser aussi un comparateur de prix{' '}
				<ExternalLinkStyled
					href="https://ledenicheur.fr/"
					target="_blank"
					rel="noreferrer"
				>
					https://ledenicheur.fr/
				</ExternalLinkStyled>
				, pour le bien de ton porte-monnaie.
			</>
		),
	},
	{
		question:
			'Tu te bases sur quoi pour choisir les périphériques qui sont dans la liste ?',
		answer:
			"J'ai une certaine connaissance du hardware et des périphériques de PC. Je m'appuie aussi fortement sur des reviews faites par des experts dans chaque domaine que tu peux consulter pour chaque produit, tout est sourcé.",
	},
	{
		question: 'Et pour les composants de mon PC ?',
		answer: (
			<>
				C'est beaucoup plus complexe (pour ne pas dire impossible) de faire la
				même chose pour les composants de PC, ça change trop et trop souvent et
				y'a des problèmes de compatibilité. Sinon, pour des conseils
				personnalisés, je t'encourage fortement à venir demander sur{' '}
				<ExternalLinkStyled href={helpUrl} target="_blank" rel="noreferrer">
					le serveur Discord
				</ExternalLinkStyled>
				.
			</>
		),
	},
];

export default function Periphs(props: PeriphsProps) {
	return (
		<Stack gap="xl">
			<Stack gap="xs">
				<Group justify="space-between">
					<Title order={1} style={{ lineHeight: 1.2 }}>
						Périphériques
					</Title>
				</Group>

				<Title order={3} mt="md">
					Pourquoi ce guide ?
				</Title>

				<Text style={{ lineHeight: 1.5 }}>
					L'objectif est de référencer des périphériques de bonne qualité avec
					des liens vers des bonnes reviews.
					<br />
					Lis bien les critères de choix au début de chaque onglet, ils
					t'aideront à déterminer ton besoin, et choisir le meilleur produit qui
					te conviendra.
					<br />
				</Text>

				<Title order={3} mt="md">
					FAQ
				</Title>

				<Accordion defaultValue="0" variant="contained">
					{FAQ.map((item, index) => (
						<Accordion.Item value={index.toString()}>
							<Accordion.Control>{item.question}</Accordion.Control>
							<Accordion.Panel>{item.answer}</Accordion.Panel>
						</Accordion.Item>
					))}
				</Accordion>

				<Title order={3} mt="md">
					Besoin de conseils ?
				</Title>

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

const Question = ({
	label,
	children,
}: {
	label: string;
	children: ReactNode;
}) => (
	<Box>
		<Text>{label}</Text>
		<Text c="gray.7">- {children}</Text>
	</Box>
);
