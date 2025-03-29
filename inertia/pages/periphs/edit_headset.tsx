import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

interface EditHeadsetProps {
	product: {
		id: string;
		brand: string;
		reference: string;
		image: string;
		recommendedPrice: number;
		additionalInfo: string;
		affiliateLinks: { label: string; url: string }[];
		reviews: { label: string; url: string }[];
		type: string;
		connectivity: string;
		microphone: boolean;
	};
}

export default function EditHeadset({ product }: EditHeadsetProps) {
	return (
		<DynamicProductForm
			title="Modifier un casque"
			formUrl={`/periphs/headset/${product.id}`}
			productType="headset"
			initialValues={product}
			formMethod="put"
		/>
	);
}
