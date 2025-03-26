import {
	Earphone,
	Headset,
	Keyboard,
	Microphone,
	Monitor,
	Mouse,
	MousePad,
} from '#shared/types/index';
import { EarphoneList } from '~/components/products/earphones/earphone_list';
import { HeadsetList } from '~/components/products/headsets/headset_list';
import { KeyboardList } from '~/components/products/keyboards/keyboard_list';
import { MicrophoneList } from '~/components/products/microphones/microphone_list';
import { MonitorList } from '~/components/products/monitors/monitor_list';
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
		case 'monitor':
			return <MonitorList products={products as Monitor[]} />;
		case 'headset':
			return <HeadsetList products={products as Headset[]} />;
		case 'earphone':
			return <EarphoneList products={products as Earphone[]} />;
		case 'microphone':
			return <MicrophoneList products={products as Microphone[]} />;
		default:
			return <div>No products found</div>;
	}
}
