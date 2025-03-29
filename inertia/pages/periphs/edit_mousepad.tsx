import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

interface EditMousePadProps {
	product: {
		id: string;
		brand: string;
		reference: string;
		image: string;
		recommendedPrice: number;
		additionalInfo: string;
		affiliateLinks: { label: string; url: string }[];
		reviews: { label: string; url: string }[];
		slideSpeed: string;
		covering: boolean;
		size: string;
	};
}

export default function EditMousePad({ product }: EditMousePadProps) {
	return (
		<DynamicProductForm
			title="Modifier un tapis de souris"
			formUrl={`/periphs/mousepad/${product.id}`}
			productType="mousepad"
			initialValues={product}
			formMethod="put"
		/>
	);
}
