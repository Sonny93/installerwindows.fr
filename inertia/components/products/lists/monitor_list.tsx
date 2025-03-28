import { Monitor, PeriphPanel } from '#shared/types/index';
import { Text } from '@mantine/core';
import classes from '../generic/product_card.module.css';
import { ProductList } from '../generic/product_list';

const panelLabels: Record<PeriphPanel, string> = {
	IPS: 'IPS',
	VA: 'VA',
	TN: 'TN',
	OLED: 'OLED',
	'QD-OLED': 'QD-OLED',
};

export function MonitorList({ products }: { products: Monitor[] }) {
	const renderSpecificFields = (product: Monitor) => (
		<>
			<Text className={classes.label}>
				Taille <span className={classes.bold}>{product.size}"</span>
			</Text>
			<Text className={classes.label}>
				Résolution <span className={classes.bold}>{product.resolution}</span>
			</Text>
			<Text className={classes.label}>
				Taux <span className={classes.bold}>{product.refreshRate} Hz</span>
			</Text>
			<Text className={classes.label}>
				Dalle <span className={classes.bold}>{panelLabels[product.panel]}</span>
			</Text>
			<Text className={classes.label}>
				Support VESA{' '}
				<span className={classes.bold}>
					{product.vesaSupport ? 'Oui' : 'Non'}
				</span>
			</Text>
		</>
	);

	return (
		<ProductList
			products={products}
			title="Écrans"
			createUrl="/periphs/monitor/create"
			createButtonText="Ajouter un écran"
			renderSpecificFields={renderSpecificFields}
		/>
	);
}
