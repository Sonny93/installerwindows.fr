import { Link } from '@inertiajs/react';
import { Button, Flex, Group, Stack, Title } from '@mantine/core';
import { ProductCard } from '~/components/products/generic/product_card';

interface BaseProduct {
	id: number;
	product: {
		brand: string;
		reference: string;
		image?: string;
		additionalInfo?: string | null;
		recommendedPrice: number;
		reviews: Array<{ url: string; label: string }>;
		affiliateLinks: Array<{ url: string; label: string }>;
	};
}

interface ProductListProps<T extends BaseProduct> {
	products: T[];
	title: string;
	createUrl: string;
	createButtonText: string;
	renderSpecificFields: (product: T) => React.ReactNode;
}

export function ProductList<T extends BaseProduct>({
	products,
	title,
	createUrl,
	createButtonText,
	renderSpecificFields,
}: ProductListProps<T>) {
	return (
		<Stack>
			<Group justify="space-between">
				<Title order={1} style={{ lineHeight: 1.2 }}>
					{title}
				</Title>
				<Button component={Link} href={createUrl}>
					{createButtonText}
				</Button>
			</Group>
			<Flex gap="md" wrap="wrap">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						renderSpecificFields={renderSpecificFields}
					/>
				))}
			</Flex>
		</Stack>
	);
}
