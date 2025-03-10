import { Mouse } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Button, Flex, Stack, Title } from '@mantine/core';
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
			<Flex gap="md" wrap="wrap">
				{products.map((product) => (
					<MouseCard key={product.id} product={product} />
				))}
			</Flex>
		</Stack>
	);
}
