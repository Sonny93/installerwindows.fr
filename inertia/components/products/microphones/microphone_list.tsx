import { Microphone } from '#shared/types/index';
import { Link } from '@inertiajs/react';
import { Button, Flex, Group, Stack, Title } from '@mantine/core';
import { MicrophoneCard } from '~/components/products/microphones/microphone_card';

export function MicrophoneList({ products }: { products: Microphone[] }) {
	return (
		<Stack>
			<Group justify="space-between">
				<Title order={1} style={{ lineHeight: 1.2 }}>
					Microphones
				</Title>
				<Button component={Link} href="/periphs/microphone/create">
					Ajouter un microphone
				</Button>
			</Group>
			<Flex gap="md" wrap="wrap">
				{products.map((product) => (
					<MicrophoneCard key={product.id} product={product} />
				))}
			</Flex>
		</Stack>
	);
}
