import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

export default function CreateKeyboard() {
	return (
		<DynamicProductForm
			title="Ajouter un clavier"
			formUrl="/periphs/keyboard/create"
			productType="keyboard"
			formMethod="post"
		/>
	);
}
