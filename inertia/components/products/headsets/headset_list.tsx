import { Headset } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Button, Flex, Group, Stack, Title } from '@mantine/core';
import { HeadsetCard } from '~/components/products/headsets/headset_card';

export function HeadsetList({ products }: { products: Headset[] }) {
	return (
		<Stack>
			<Group justify="space-between">
				<Title order={1} style={{ lineHeight: 1.2 }}>
					Casques
				</Title>
				<Button component={Link} href="/periphs/headset/create">
					Ajouter un casque
				</Button>
			</Group>
			<Flex gap="md" wrap="wrap">
				{products.map((product) => (
					<HeadsetCard key={product.id} product={product} />
				))}
			</Flex>
		</Stack>
	);
}
