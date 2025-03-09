import { CountPerCategory, ProductType } from '#shared/types/index';
import { SimpleGrid } from '@mantine/core';
import { ProductCategoryCard } from '~/components/products/categories/card/product_category_card';

const CATEGORIES: [ProductType, string, string][] = [
	['mouse', 'Souris', 'mouse.jpg'],
	['keyboard', 'Claviers', 'keyboard.jpg'],
	['monitor', 'Écrans', 'monitor.jpg'],
	['headset', 'Casques', 'headset.jpg'],
	['earphone', 'IEM/Intra (écouteurs)', 'earphone.jpg'],
	['microphone', 'Microphones', 'microphone.jpg'],
	['mousepad', 'Tapis de souris', 'mouse_pad.png'],
];

interface ProductCategoryListProps {
	count: CountPerCategory;
}

export const ProductCategoryList = (props: ProductCategoryListProps) => (
	<SimpleGrid cols={3}>
		{CATEGORIES.map(([id, name, thumbnail]) => (
			<ProductCategoryCard
				key={id}
				id={id}
				name={name}
				thumbnail={thumbnail}
				total_periphs={props.count[id as keyof CountPerCategory]}
			/>
		))}
	</SimpleGrid>
);
