import { Mouse } from '#shared/types/index';
import {
	Box,
	Card,
	Group,
	Image,
	SimpleGrid,
	Stack,
	Text,
} from '@mantine/core';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import classes from './mouse_card.module.css';

const DEFAULT_IMAGE = 'http://localhost:3333/periphs/mouse.jpg';

export function MouseCard({ product }: { product: Mouse }) {
	const { wire, shape, weight, product: productData } = product;
	console.log(product);
	return (
		<Card radius="md" p="md" className={classes.card}>
			<Card.Section>
				<Image
					src={productData.image ?? DEFAULT_IMAGE}
					alt={productData.brand}
				/>
			</Card.Section>

			<Stack gap={0}>
				<Card.Section className={classes.section} mt="md">
					<Text fz="lg" fw={500}>
						{productData.brand} {productData.reference}
					</Text>
					<Text fz="sm" mt="xs">
						{productData.additionalInfo}
					</Text>
				</Card.Section>

				<Card.Section className={classes.section}>
					<Text className={classes.label} c="dimmed">
						Caractéristiques
					</Text>
					<SimpleGrid cols={2} mt={5}>
						<Text size="sm" variant="light" fw={300}>
							Connectivité <Box fw={500}>{wire ? 'Filaire' : 'Sans fil'}</Box>
						</Text>
						<Text size="sm" variant="light" fw={300}>
							Poids <Box fw={500}>{weight}g</Box>
						</Text>
						<Text size="sm" variant="light" fw={300}>
							Forme <Box fw={500}>{shape}</Box>
						</Text>
						<Text size="sm" variant="light" fw={300}>
							Prix conseillé
							<Box fw={500}>
								{'<'}
								{productData.recommendedPrice}€
							</Box>
						</Text>
					</SimpleGrid>
				</Card.Section>

				<Card.Section className={classes.section}>
					<Text className={classes.label} c="dimmed">
						Reviews
					</Text>
					<Group gap={7} mt={5}>
						{productData.reviews.length > 0 ? (
							productData.reviews.map((review, index) => (
								<>
									<ExternalLinkStyled href={review.url} key={review.url}>
										{review.label}
									</ExternalLinkStyled>
									{index !== productData.reviews.length - 1 && '•'}
								</>
							))
						) : (
							<Text size="sm" variant="light" fw={300}>
								Aucune review
							</Text>
						)}
					</Group>
				</Card.Section>

				<Card.Section className={classes.section}>
					<Text className={classes.label} c="dimmed">
						Liens affiliés
					</Text>
					<Group gap={7} mt={5}>
						{productData.affiliateLinks.length > 0 ? (
							productData.affiliateLinks.map((link, index) => (
								<>
									<ExternalLinkStyled href={link.url} key={link.url}>
										{link.label}
									</ExternalLinkStyled>
									{index !== productData.affiliateLinks.length - 1 && '•'}
								</>
							))
						) : (
							<Text size="sm" variant="light" fw={300}>
								Aucun lien affilié
							</Text>
						)}
					</Group>
				</Card.Section>
			</Stack>
		</Card>
	);
}
