import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

export default function CreateMonitor() {
	return (
		<DynamicProductForm
			title="Ajouter un moniteur"
			formUrl="/periphs/monitor/create"
			productType="monitor"
		/>
	);
}
