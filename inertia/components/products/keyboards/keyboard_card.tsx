import { Keyboard, PeriphSize } from '#shared/types/index';
import { Card, Group, Image, SimpleGrid, Stack, Text } from '@mantine/core';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import classes from './keyboard_card.module.css';

const DEFAULT_IMAGE = '/periphs/keyboard.jpg';

const sizeLabels: Record<PeriphSize, string> = {
	full: 'Full Size',
	tenkeyless: 'TKL',
	'87': '87%',
	'60': '60%',
	'40': '40%',
};

export function KeyboardCard({ product }: { product: Keyboard }) {
	const { size, switches, product: productData } = product;
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
					{productData.additionalInfo && (
						<Text fz="sm" mt="xs">
							{productData.additionalInfo}
						</Text>
					)}
				</Card.Section>

				<Card.Section className={classes.section}>
					<Text className={classes.sectionTitle}>Caractéristiques</Text>
					<SimpleGrid cols={2} mt={5}>
						<Text className={classes.label}>
							Taille <span className={classes.bold}>{sizeLabels[size]}</span>
						</Text>
						<Text className={classes.label}>
							Switch <span className={classes.bold}>{switches}</span>
						</Text>
						<Text className={classes.label}>
							Prix conseillé
							<span className={classes.bold}>
								{'<'}
								{productData.recommendedPrice}€
							</span>
						</Text>
					</SimpleGrid>
				</Card.Section>

				<Card.Section className={classes.section}>
					<Text className={classes.sectionTitle}>Reviews</Text>
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
							<Text className={classes.label}>Aucune review</Text>
						)}
					</Group>
				</Card.Section>

				<Card.Section className={classes.section}>
					<Text className={classes.sectionTitle}>Liens affiliés</Text>
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
							<Text className={classes.label}>Aucun lien affilié</Text>
						)}
					</Group>
				</Card.Section>
			</Stack>
		</Card>
	);
}
