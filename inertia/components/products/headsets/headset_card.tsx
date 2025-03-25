import { Headset } from '#shared/types/index';
import { Card, Group, Image, SimpleGrid, Stack, Text } from '@mantine/core';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import classes from './headset_card.module.css';

const DEFAULT_IMAGE = '/periphs/headset.jpg';

const typeLabels = {
	open: 'Ouvert',
	closed: 'Fermé',
};

const connectivityLabels = {
	USB: 'USB',
	Jack: 'Jack',
	Bluetooth: 'Bluetooth',
};

export function HeadsetCard({ product }: { product: Headset }) {
	const { type, connectivity, microphone, product: productData } = product;
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
							Connectivité{' '}
							<span className={classes.bold}>
								{connectivityLabels[connectivity]}
							</span>
						</Text>
						<Text className={classes.label}>
							Type <span className={classes.bold}>{typeLabels[type]}</span>
						</Text>
						<Text className={classes.label}>
							Microphone{' '}
							<span className={classes.bold}>{microphone ? 'Oui' : 'Non'}</span>
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
