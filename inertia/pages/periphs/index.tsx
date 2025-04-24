import { helpUrl } from '#config/project';
import { CountPerCategory } from '#shared/types/index';
import { Group, Stack, Title } from '@mantine/core';
import { FAQ } from '~/components/generics/faq';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import { ProductCategoryList } from '~/components/products/categories/product_category_list';
import { FaqItem } from '~/types';

interface PeriphsProps {
	count: CountPerCategory;
}

const items: FaqItem[] = [
	{
		label: "Pourquoi ce guide d'achat ?",
		description: (
			<>
				C'est un guide pour choisir les périphériques qui sont dans la liste. Il
				est basé sur des critères de choix et des reviews.
				<br />
				Lis bien les critères de choix au début de chaque onglet, ils t'aideront
				à déterminer ton besoin, et choisir le meilleur produit qui te
				conviendra.
			</>
		),
	},
	{
		label: "Pourquoi il n'y a pas X périphérique ?",
		description:
			"Soit parce que le périphérique dont tu parles est naze, soit parce que je pense pas à tout. Si y'a quelque chose que tu connais qui mérite sa place dans la liste, hésite pas à me DM quelque part",
	},
	{
		label: 'On pourrait rajouter X catégorie ?',
		description:
			"Pareil, DM moi ce que tu voudrais voir, et on va voir si c'est possible de faire un truc bien.",
	},
	{
		label: "Pourquoi y'a des sites spécifiques qui sont linkés ?",
		description: (
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
		label:
			'Tu te bases sur quoi pour choisir les périphériques qui sont dans la liste ?',
		description:
			"J'ai une certaine connaissance du hardware et des périphériques de PC. Je m'appuie aussi fortement sur des reviews faites par des experts dans chaque domaine que tu peux consulter pour chaque produit, tout est sourcé.",
	},
	{
		label: 'Et pour les composants de mon PC ?',
		description: (
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
			<Group justify="space-between">
				<Title order={1} style={{ lineHeight: 1.2 }}>
					Périphériques
				</Title>
			</Group>
			<FAQ items={items} />
			<ProductCategoryList count={props.count} />
		</Stack>
	);
}
