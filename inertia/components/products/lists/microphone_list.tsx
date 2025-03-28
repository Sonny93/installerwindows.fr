import { Microphone } from '#shared/types/index';
import { Text } from '@mantine/core';
import classes from '../generic/product_card.module.css';
import { ProductList } from '../generic/product_list';

export function MicrophoneList({ products }: { products: Microphone[] }) {
	const renderSpecificFields = (product: Microphone) => (
		<>
			<Text className={classes.label}>
				Connectivité{' '}
				<span className={classes.bold}>{product.connectivity}</span>
			</Text>
			<Text className={classes.label}>
				Type <span className={classes.bold}>{product.microphoneType}</span>
			</Text>
		</>
	);

	return (
		<ProductList
			products={products}
			title="Microphones"
			createUrl="/periphs/microphone/create"
			createButtonText="Ajouter un microphone"
			renderSpecificFields={renderSpecificFields}
		/>
	);
}
