import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

interface EditEarphoneProps {
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
		microOnWire: boolean;
	};
}

export default function EditEarphone({ product }: EditEarphoneProps) {
	return (
		<DynamicProductForm
			title="Modifier des écouteurs"
			formUrl={`/periphs/earphone/${product.id}`}
			productType="earphone"
			initialValues={product}
			formMethod="put"
		/>
	);
}
