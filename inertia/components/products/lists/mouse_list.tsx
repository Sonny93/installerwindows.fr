import { Mouse } from '#shared/types/index';
import { Text } from '@mantine/core';
import classes from '../generic/product_card.module.css';
import { ProductList } from '../generic/product_list';

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
		/>
	);
}
