import {
	Earphone,
	Headset,
	Keyboard,
	Microphone,
	Monitor,
	Mouse,
	MousePad,
} from '#shared/types/index';
import { MouseList } from '~/components/products/mouses/mouse_list';

export default function PeriphCategory({
	products,
	productType,
}: {
	products:
		| Mouse[]
		| Monitor[]
		| MousePad[]
		| Microphone[]
		| Headset[]
		| Keyboard[]
		| Earphone[];
	productType: string;
}) {
	switch (productType) {
		case 'mouse':
			return <MouseList products={products as Mouse[]} />;
		default:
			return <div>No products found</div>;
	}
}
