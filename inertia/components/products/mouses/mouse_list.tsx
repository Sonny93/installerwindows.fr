import { Mouse } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Button, SimpleGrid, Stack, Title } from '@mantine/core';
import { MouseCard } from '~/components/products/mouses/mouse_card';

export function MouseList({ products }: { products: Mouse[] }) {
	return (
		<Stack>
			<Title order={1} style={{ lineHeight: 1.2 }}>
				Souris
			</Title>
			<Button component={Link} href="/periphs/create/mouse">
				Ajouter une souris
			</Button>
			<SimpleGrid cols={3}>
				{products.map((product) => (
					<MouseCard key={product.id} product={product} />
				))}
			</SimpleGrid>
		</Stack>
	);
}
