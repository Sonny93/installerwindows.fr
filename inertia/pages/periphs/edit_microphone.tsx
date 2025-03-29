import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

interface EditMicrophoneProps {
	product: {
		id: string;
		brand: string;
		reference: string;
		image: string;
		recommendedPrice: number;
		additionalInfo: string;
		affiliateLinks: { label: string; url: string }[];
		reviews: { label: string; url: string }[];
		connectivity: string;
		microphoneType: string;
	};
}

export default function EditMicrophone({ product }: EditMicrophoneProps) {
	return (
		<DynamicProductForm
			title="Modifier un microphone"
			formUrl={`/periphs/microphone/${product.id}`}
			productType="microphone"
			initialValues={product}
			formMethod="put"
		/>
	);
}
