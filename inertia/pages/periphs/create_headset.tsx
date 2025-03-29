import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

export default function CreateHeadset() {
	return (
		<DynamicProductForm
			title="Ajouter un casque"
			formUrl="/periphs/headset/create"
			productType="headset"
			formMethod="post"
		/>
	);
}
