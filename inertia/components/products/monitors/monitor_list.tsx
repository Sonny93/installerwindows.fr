import { Monitor } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Button, Flex, Group, Stack, Title } from '@mantine/core';
import { MonitorCard } from '~/components/products/monitors/monitor_card';

export function MonitorList({ products }: { products: Monitor[] }) {
	return (
		<Stack>
			<Group justify="space-between">
				<Title order={1} style={{ lineHeight: 1.2 }}>
					Écrans
				</Title>
				<Button component={Link} href="/periphs/monitor/create">
					Ajouter un écran
				</Button>
			</Group>
			<Flex gap="md" wrap="wrap">
				{products.map((product) => (
					<MonitorCard key={product.id} product={product} />
				))}
			</Flex>
		</Stack>
	);
}
