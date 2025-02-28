import {
	devUrl,
	discordSuggestionChannelUrl,
	editorXUrl,
	editorYtbUrl,
	projectGithubUrl,
} from '#config/project';
import * as packageJson from '@/package.json';
import { Link } from '@inertiajs/react';
import {
	ActionIcon,
	Anchor,
	Avatar,
	Box,
	Group,
	Stack,
	Text,
} from '@mantine/core';
import { ReactNode } from 'react';
import { FaDiscord, FaGithub, FaYoutube } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { MdSignalWifiStatusbar4Bar } from 'react-icons/md';
import { TbContract, TbLogin, TbLogout } from 'react-icons/tb';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import useUser from '~/hooks/use_user';
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
						Guides pour (ré)installer Windows 10/11 au propre et faire des
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

const Field = ({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) => (
	<Stack gap="xs">
		<Text className={classes.footer__field_label}>{label}</Text>
		<Group className={classes.footer__field_content}>{children}</Group>
	</Stack>
);

function TextIcon({
	icon: Icon,
	children,
	href,
	external = false,
}: {
	icon: IconType;
	children: ReactNode;
	href: string;
	external?: boolean;
}) {
	const content = (
		<Group gap="sm">
			<Icon size={24} />
			{children}
		</Group>
	);

	if (external) {
		return (
			<ExternalLinkStyled
				className={classes.footer__link}
				href={href}
				target="_self"
			>
				{content}
			</ExternalLinkStyled>
		);
	}
	return (
		<Anchor component={Link} className={classes.footer__link} href={href}>
			{content}
		</Anchor>
	);
}

function UserCard() {
	const auth = useUser();

	if (auth.isAuthenticated) {
		return <Authenticated />;
	}

	return <NotAuthenticated />;
}

const NotAuthenticated = () => (
	<TextIcon icon={TbLogin} href="/auth/login" external>
		Connexion
	</TextIcon>
);

function Authenticated() {
	const { user } = useUser();
	return (
		<Group gap="sm">
			<Avatar size="sm" src={user!.avatarUrl} radius={30} />
			<Text fz="sm" fw={500}>
				{user!.fullname}
			</Text>
			<ActionIcon
				size="sm"
				component="a"
				href="/auth/logout"
				variant="filled"
				color="red"
			>
				<TbLogout size={18} />
			</ActionIcon>
		</Group>
	);
}
