import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

export default function CreateMousePad() {
	return (
		<DynamicProductForm
			title="Ajouter un tapis de souris"
			formUrl="/periphs/mousepad/create"
			productType="mousepad"
		/>
	);
}
