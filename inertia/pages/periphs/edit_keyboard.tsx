import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

interface EditKeyboardProps {
	product: {
		id: string;
		brand: string;
		reference: string;
		image: string;
		recommendedPrice: number;
		additionalInfo: string;
		affiliateLinks: { label: string; url: string }[];
		reviews: { label: string; url: string }[];
		size: string;
		switches: string;
	};
}

export default function EditKeyboard({ product }: EditKeyboardProps) {
	return (
		<DynamicProductForm
			title="Modifier un clavier"
			formUrl={`/periphs/keyboard/${product.id}`}
			productType="keyboard"
			initialValues={product}
			formMethod="put"
		/>
	);
}
