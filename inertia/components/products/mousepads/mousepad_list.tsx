import { MousePad } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Button, Flex, Group, Stack, Title } from '@mantine/core';
import { MousePadCard } from '~/components/products/mousepads/mousepad_card';

export function MousePadList({ products }: { products: MousePad[] }) {
	return (
		<Stack>
			<Group justify="space-between">
				<Title order={1} style={{ lineHeight: 1.2 }}>
					Tapis de souris
				</Title>
				<Button component={Link} href="/periphs/mousepad/create">
					Ajouter un tapis de souris
				</Button>
			</Group>
			<Flex gap="md" wrap="wrap">
				{products.map((product) => (
					<MousePadCard key={product.id} product={product} />
				))}
			</Flex>
		</Stack>
	);
}
