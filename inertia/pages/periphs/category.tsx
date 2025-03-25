import {
	Earphone,
	Headset,
	Keyboard,
	Microphone,
	Monitor,
	Mouse,
	MousePad,
} from '#shared/types/index';
import { KeyboardList } from '~/components/products/keyboards/keyboard_list';
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
		case 'keyboard':
			return <KeyboardList products={products as Keyboard[]} />;
		default:
			return <div>No products found</div>;
	}
}
