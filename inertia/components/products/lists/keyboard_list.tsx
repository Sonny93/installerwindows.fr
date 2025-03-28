import { Keyboard, KeyboardSize } from '#shared/types/index';
import { Text } from '@mantine/core';
import classes from '../generic/product_card.module.css';
import { ProductList } from '../generic/product_list';

const sizeLabels: Record<KeyboardSize, string> = {
	full: '100%',
	tenkeyless: 'TKL',
	'87': '87%',
	'60': '60%',
	'40': '40%',
};

export function KeyboardList({ products }: { products: Keyboard[] }) {
	const renderSpecificFields = (product: Keyboard) => (
		<>
			<Text className={classes.label}>
				Taille <span className={classes.bold}>{sizeLabels[product.size]}</span>
			</Text>
			<Text className={classes.label}>
				Switch <span className={classes.bold}>{product.switches}</span>
			</Text>
		</>
	);

	return (
		<ProductList
			products={products}
			title="Claviers"
			createUrl="/periphs/keyboard/create"
			createButtonText="Ajouter un clavier"
			renderSpecificFields={renderSpecificFields}
		/>
	);
}
