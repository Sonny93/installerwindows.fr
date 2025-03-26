import { Earphone } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Button, Flex, Group, Stack, Title } from '@mantine/core';
import { EarphoneCard } from '~/components/products/earphones/earphone_card';

export function EarphoneList({ products }: { products: Earphone[] }) {
	return (
		<Stack>
			<Group justify="space-between">
				<Title order={1} style={{ lineHeight: 1.2 }}>
					Écouteurs
				</Title>
				<Button component={Link} href="/periphs/earphone/create">
					Ajouter des écouteurs
				</Button>
			</Group>
			<Flex gap="md" wrap="wrap">
				{products.map((product) => (
					<EarphoneCard key={product.id} product={product} />
				))}
			</Flex>
		</Stack>
	);
}
