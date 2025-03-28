import { Headset } from '#shared/types/index';
import { Text } from '@mantine/core';
import classes from '../generic/product_card.module.css';
import { ProductList } from '../generic/product_list';

const typeLabels = {
	open: 'Ouvert',
	closed: 'Fermé',
};

const connectivityLabels = {
	USB: 'USB',
	Jack: 'Jack',
	Bluetooth: 'Bluetooth',
};

export function HeadsetList({ products }: { products: Headset[] }) {
	const renderSpecificFields = (product: Headset) => (
		<>
			<Text className={classes.label}>
				Connectivité{' '}
				<span className={classes.bold}>
					{connectivityLabels[product.connectivity]}
				</span>
			</Text>
			<Text className={classes.label}>
				Type <span className={classes.bold}>{typeLabels[product.type]}</span>
			</Text>
			<Text className={classes.label}>
				Microphone{' '}
				<span className={classes.bold}>
					{product.microphone ? 'Oui' : 'Non'}
				</span>
			</Text>
		</>
	);

	return (
		<ProductList
			products={products}
			title="Casques"
			createUrl="/periphs/headset/create"
			createButtonText="Ajouter un casque"
			renderSpecificFields={renderSpecificFields}
		/>
	);
}
