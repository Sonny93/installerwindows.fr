import { MousePad } from '#shared/types/index';
import { Text } from '@mantine/core';
import classes from '../generic/product_card.module.css';
import { ProductList } from '../generic/product_list';

export function MousePadList({ products }: { products: MousePad[] }) {
	const renderSpecificFields = (product: MousePad) => (
		<>
			<Text className={classes.label}>
				Vitesse de glissement{' '}
				<span className={classes.bold}>{product.slideSpeed}</span>
			</Text>
			<Text className={classes.label}>
				Revêtement{' '}
				<span className={classes.bold}>{product.covering ? 'Oui' : 'Non'}</span>
			</Text>
			<Text className={classes.label}>
				Taille <span className={classes.bold}>{product.size}</span>
			</Text>
		</>
	);

	return (
		<ProductList
			products={products}
			title="Tapis de souris"
			createUrl="/periphs/mousepad/create"
			createButtonText="Ajouter un tapis de souris"
			renderSpecificFields={renderSpecificFields}
		/>
	);
}
