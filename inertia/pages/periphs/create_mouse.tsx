import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

export default function CreateMouse() {
	return (
		<DynamicProductForm
			title="Ajouter une souris"
			formUrl="/periphs/mouse/create"
			productType="mouse"
		/>
	);
}
