import {
	Earphone,
	Headset,
	Keyboard,
	Microphone,
	Monitor,
	Mouse,
	MousePad,
} from '#shared/types/index';
import { EarphoneList } from '~/components/products/lists/earphone_list';
import { HeadsetList } from '~/components/products/lists/headset_list';
import { KeyboardList } from '~/components/products/lists/keyboard_list';
import { MicrophoneList } from '~/components/products/lists/microphone_list';
import { MonitorList } from '~/components/products/lists/monitor_list';
import { MouseList } from '~/components/products/lists/mouse_list';
import { MousePadList } from '~/components/products/lists/mousepad_list';

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
		case 'monitor':
			return <MonitorList products={products as Monitor[]} />;
		case 'headset':
			return <HeadsetList products={products as Headset[]} />;
		case 'earphone':
			return <EarphoneList products={products as Earphone[]} />;
		case 'microphone':
			return <MicrophoneList products={products as Microphone[]} />;
		case 'mousepad':
			return <MousePadList products={products as MousePad[]} />;
		default:
			return <div>Aucun produit trouvé</div>;
	}
}
