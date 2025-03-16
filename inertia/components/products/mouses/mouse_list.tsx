import { Mouse } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Button, Flex, Group, Stack, Title } from '@mantine/core';
import { MouseCard } from '~/components/products/mouses/mouse_card';

export function MouseList({ products }: { products: Mouse[] }) {
	return (
		<Stack>
			<Group justify="space-between">
				<Title order={1} style={{ lineHeight: 1.2 }}>
					Souris
				</Title>
				<Button component={Link} href="/periphs/mouse/create">
					Ajouter une souris
				</Button>
			</Group>
			<Flex gap="md" wrap="wrap">
				{products.map((product) => (
					<MouseCard key={product.id} product={product} />
				))}
			</Flex>
		</Stack>
	);
}
