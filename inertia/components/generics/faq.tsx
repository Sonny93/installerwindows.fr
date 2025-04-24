import { helpUrl } from '#config/project';
import { Accordion, Box, Title } from '@mantine/core';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import { FaqItem } from '~/types';

interface FaqProps {
	title?: string;
	items: FaqItem[];
}

export const FAQ = ({ title = 'FAQ', items }: FaqProps) => (
	<Box>
		<Title order={3} mb="xs">
			{title}
		</Title>
		<Accordion defaultValue="0" variant="contained">
			{items.map((item, index) => (
				<Accordion.Item value={index.toString()}>
					<Accordion.Control>{item.label}</Accordion.Control>
					<Accordion.Panel>{item.description}</Accordion.Panel>
				</Accordion.Item>
			))}
			<Accordion.Item value="__help">
				<Accordion.Control>Besoin d'aide ?</Accordion.Control>
				<Accordion.Panel>
					Si tu as besoin d'aide, n'hésite pas à rejoindre{' '}
					<ExternalLinkStyled href={helpUrl} target="_blank" rel="noreferrer">
						le serveur Discord
					</ExternalLinkStyled>
					.
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	</Box>
);
