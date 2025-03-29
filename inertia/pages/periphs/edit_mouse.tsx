import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

interface EditMouseProps {
	product: {
		id: string;
		brand: string;
		reference: string;
		image: string;
		recommendedPrice: number;
		additionalInfo: string;
		affiliateLinks: { label: string; url: string }[];
		reviews: { label: string; url: string }[];
		wire: boolean;
		shape: string;
		weight: number;
	};
}

export default function EditMouse({ product }: EditMouseProps) {
	console.log(product);
	return (
		<DynamicProductForm
			title="Modifier une souris"
			formUrl={`/periphs/mouse/${product.id}`}
			productType="mouse"
			initialValues={product}
			formMethod="put"
		/>
	);
}
