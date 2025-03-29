import { DynamicProductForm } from '~/components/products/form/dynamic_product_form';

interface EditMonitorProps {
	product: {
		id: string;
		brand: string;
		reference: string;
		image: string;
		recommendedPrice: number;
		additionalInfo: string;
		affiliateLinks: { label: string; url: string }[];
		reviews: { label: string; url: string }[];
		size: number;
		resolution: string;
		refreshRate: number;
		panel: string;
		vesaSupport: boolean;
	};
}

export default function EditMonitor({ product }: EditMonitorProps) {
	return (
		<DynamicProductForm
			title="Modifier un moniteur"
			formUrl={`/periphs/monitor/${product.id}`}
			productType="monitor"
			initialValues={product}
			formMethod="put"
		/>
	);
}
