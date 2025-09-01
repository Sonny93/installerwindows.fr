import {
	devUrl,
	discordSuggestionChannelUrl,
	editorXUrl,
	editorYtbUrl,
	projectGithubUrl,
} from '#config/project';
import * as packageJson from '@/package.json';
import { Box, Stack, Text } from '@mantine/core';
import { FaDiscord, FaGithub, FaYoutube } from 'react-icons/fa';
import { MdSignalWifiStatusbar4Bar } from 'react-icons/md';
import { TbContract } from 'react-icons/tb';
import { Field } from '~/components/generics/footer/field';
import { TextIcon } from '~/components/generics/footer/text_icon';
import { UserCard } from '~/components/generics/footer/user_card/user_card';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import classes from './footer.module.css';

interface FooterProps {
	width: string;
}

export const Footer = ({ width }: FooterProps) => (
	<Box className={classes.footer}>
		<Stack className={classes.footer__content} gap="xl" w={width}>
			<Field label="Installerwindows.fr">
				<Box>
					<Text className={classes.footer__description}>
						Guides pour (ré)installer Windows 11 au propre et faire des
						optimisations saines pour votre machine. Il s'agit de guides
						complets, que vous devriez pouvoir suivre quel que soit votre niveau
						en informatique.
					</Text>
					<Text c="dimmed" size="sm" mt="xs">
						v{packageJson.version}
					</Text>
				</Box>
			</Field>
			<Field label="Liens utiles">
				<TextIcon icon={FaYoutube} href={editorYtbUrl} external>
					Piwi
				</TextIcon>
				<TextIcon icon={FaDiscord} href={discordSuggestionChannelUrl} external>
					Discord
				</TextIcon>
				<TextIcon icon={FaGithub} href={projectGithubUrl} external>
					Github
				</TextIcon>
				<TextIcon icon={MdSignalWifiStatusbar4Bar} href="/status">
					Statut des services
				</TextIcon>
				<TextIcon icon={TbContract} href="/cgu">
					CGUs
				</TextIcon>
				<UserCard />
			</Field>
			<Text className={classes.footer__credits}>
				Réalisé avec ❤️ par{' '}
				<ExternalLinkStyled href={devUrl}>Sonny</ExternalLinkStyled>, rédaction
				par <ExternalLinkStyled href={editorXUrl}>Piwi</ExternalLinkStyled>
			</Text>
		</Stack>
	</Box>
);
