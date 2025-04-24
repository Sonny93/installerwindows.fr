import { Mouse } from '#shared/types/index';
import { Text } from '@mantine/core';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import { FaqItem } from '~/types';
import classes from '../generic/product_card.module.css';
import { ProductList } from '../generic/product_list';

const CRITERIAS: FaqItem[] = [
	{
		label: 'La forme',
		description:
			'C\'est le critère le plus important. Il faut que la souris convienne à ta main, que la prise soit agréable et que la taille soit adaptée. Ambidextre ou ergonomique, petit ou grand, y\'a pas de "mieux", seulement des préférences personnelles selon ta main. Malheureusement on a pas vraiment de moyen de te dire ce qui sera mieux pour toi, il faut tester.',
	},
	{
		label: 'La marque',
		description:
			"En gros tout est ok tant que ça vient d'une marque à peu près connue, mais il faut éviter les machins chinois à 20€ type g-lab et les conneries du genre.",
	},
	{
		label: 'Les trous',
		description: `Une mode récente, c'est de faire des souris avec des trous. Ca réduit le poids, mais ça se salit plus et c'est pénible à nettoyer. Pour certains, c'est aussi désagréable sous la main.Moi, personnellement je prendrai plus jamais une souris à trous. Fais ton choix, y'a pas de "mieux".`,
	},
	{
		label: 'Le poids',
		description:
			"C'est vraiment un petit argument, je sais même pas si c'est utile de le mentionner. Chacun aura sa préférence, souris légère, lourde, moyenne, ça dépend des gens, des jeux, des tapis de souris etc.Faut tester, mais faut aussi ne pas y accorder trop d'importance, c'est pas crucial (malgré ce que jean michel souris légère te dira).",
	},
	{
		label: 'Doc alternatif',
		description: (
			<>
				La spreadsheet d'Euphrao sur les souris et les tapis de souris est aussi
				très bien, et je t'encourage à aller la voir si y'a rien qui te plaît
				ici. Elle a notamment plus de souris exotiques qui sontpas facilement
				disponibles en france sur des sites avec une politique de retours
				simple, ce qui explique que moi je les suggère pas forcément ici.
				<ExternalLinkStyled href="https://docs.google.com/spreadsheets/d/1NMDwOkn3uynv7aIBZxrIl9kLiV7t9OXJJIFySD-pOrY/edit?gid=0#gid=0">
					Euphcyclopédie
				</ExternalLinkStyled>
			</>
		),
	},
];

export function MouseList({ products }: { products: Mouse[] }) {
	const renderSpecificFields = (product: Mouse) => (
		<>
			<Text className={classes.label}>
				Connectivité{' '}
				<span className={classes.bold}>
					{product.wire ? 'Filaire' : 'Sans fil'}
				</span>
			</Text>
			<Text className={classes.label}>
				Poids <span className={classes.bold}>{product.weight}g</span>
			</Text>
			<Text className={classes.label}>
				Forme <span className={classes.bold}>{product.shape}</span>
			</Text>
		</>
	);

	return (
		<ProductList
			products={products}
			title="Souris"
			createUrl="/periphs/mouse/create"
			createButtonText="Ajouter une souris"
			renderSpecificFields={renderSpecificFields}
			criterias={{
				title: 'Critères de choix',
				items: CRITERIAS,
			}}
		/>
	);
}
