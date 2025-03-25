import { Keyboard } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Button, Flex, Group, Stack, Title } from '@mantine/core';
import { KeyboardCard } from '~/components/products/keyboards/keyboard_card';

export function KeyboardList({ products }: { products: Keyboard[] }) {
	return (
		<Stack>
			<Group justify="space-between">
				<Title order={1} style={{ lineHeight: 1.2 }}>
					Claviers
				</Title>
				<Button component={Link} href="/periphs/keyboard/create">
					Ajouter un clavier
				</Button>
			</Group>
			<Flex gap="md" wrap="wrap">
				{products.map((product) => (
					<KeyboardCard key={product.id} product={product} />
				))}
			</Flex>
		</Stack>
	);
}
