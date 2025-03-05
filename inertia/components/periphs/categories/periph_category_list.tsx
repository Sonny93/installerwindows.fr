import { CountPerCategory } from '#shared/types/index';
import { SimpleGrid } from '@mantine/core';
import { PeriphCategoryCard } from '~/components/periphs/categories/card/periph_category_card';

const CATEGORIES = [
	['mouse', 'Souris', 'mouse.jpg'],
	['keyboard', 'Claviers', 'keyboard.jpg'],
	['monitor', 'Écrans', 'monitor.jpg'],
	['headset', 'Casques', 'headset.jpg'],
	['earphone', 'IEM/Intra (écouteurs)', 'earphone.jpg'],
	['microphone', 'Microphones', 'microphone.jpg'],
	['mousepad', 'Tapis de souris', 'mouse_pad.png'],
];

interface PeriphCategoryListProps {
	count: CountPerCategory;
}

export const PeriphCategoryList = (props: PeriphCategoryListProps) => (
	<SimpleGrid cols={3}>
		{CATEGORIES.map(([id, name, thumbnail]) => (
			<PeriphCategoryCard
				key={id}
				id={id}
				name={name}
				thumbnail={thumbnail}
				total_periphs={props.count[id as keyof CountPerCategory]}
			/>
		))}
	</SimpleGrid>
);
