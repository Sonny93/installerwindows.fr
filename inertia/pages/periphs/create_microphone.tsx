import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

export default function CreateMicrophone() {
	return (
		<DynamicProductForm
			title="Ajouter un microphone"
			formUrl="/periphs/microphone/create"
			productType="microphone"
			formMethod="post"
		/>
	);
}
