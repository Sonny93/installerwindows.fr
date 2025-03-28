import { Earphone } from '#shared/types/index';
import { Text } from '@mantine/core';
import classes from '../generic/product_card.module.css';
import { ProductList } from '../generic/product_list';

export function EarphoneList({ products }: { products: Earphone[] }) {
	const renderSpecificFields = (product: Earphone) => (
		<>
			<Text className={classes.label}>
				Connectivité{' '}
				<span className={classes.bold}>
					{product.wire ? 'Filaire' : 'Sans fil'}
				</span>
			</Text>
			<Text className={classes.label}>
				Microphone sur fil{' '}
				<span className={classes.bold}>
					{product.microOnWire ? 'Oui' : 'Non'}
				</span>
			</Text>
		</>
	);

	return (
		<ProductList
			products={products}
			title="Écouteurs"
			createUrl="/periphs/earphone/create"
			createButtonText="Ajouter des écouteurs"
			renderSpecificFields={renderSpecificFields}
		/>
	);
}
