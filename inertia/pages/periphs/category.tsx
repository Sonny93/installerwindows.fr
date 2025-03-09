import {
	Earphone,
	Headset,
	Keyboard,
	Microphone,
	Monitor,
	Mouse,
	MousePad,
} from '#shared/types/index';

export default function PeriphCategory({
	products,
	category,
}: {
	products:
		| Mouse[]
		| Monitor[]
		| MousePad[]
		| Microphone[]
		| Headset[]
		| Keyboard[]
		| Earphone[];
	category: string;
}) {
	console.log(products);
	return (
		<div>
			<h1>{category}</h1>
		</div>
	);
}
