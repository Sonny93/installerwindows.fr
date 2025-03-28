import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

export default function CreateEarphone() {
	return (
		<DynamicProductForm
			title="Ajouter des écouteurs"
			formUrl="/periphs/earphone/create"
			productType="earphone"
		/>
	);
}
