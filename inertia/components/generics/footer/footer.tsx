import {
	devName,
	devUrl,
	editorName,
	editorXUrl,
	editorYtbUrl,
	helpUrl,
	projectGithubReleasesUrl,
	projectGithubUrl,
	projectName,
} from '#config/project';
import * as packageJson from '@/package.json';
import {
	ActionIcon,
	Anchor,
	Avatar,
	Container,
	Group,
	Text,
} from '@mantine/core';
import {
	TbBrandDiscord,
	TbBrandTwitter,
	TbBrandYoutube,
	TbLogout,
} from 'react-icons/tb';
import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';
import useUser from '~/hooks/use_user';
import classes from './footer.module.css';

const dataGroups = [
	{
		title: 'Contribuer',
		links: [
			{ label: 'GitHub', link: projectGithubUrl },
			{ label: 'Releases', link: projectGithubReleasesUrl },
			{ label: `Version ${packageJson.version}` },
		],
	},
	{
		title: 'Communauté',
		links: [
			{ label: 'Serveur Discord', link: helpUrl },
			{ label: 'Suivre Piwi sur X', link: editorXUrl },
		],
	},
	{
		title: 'Autre',
		links: [
			{ label: "Conditions Générales d'Utilisation", link: '/cgu' },
			{ label: 'Statut des services', link: '/status' },
		],
	},
];

export function Footer() {
	const { isAuthenticated } = useUser();

	const groups = dataGroups.map((group) => {
		const links = group.links.map((link, index) => (
			<Text<'a'>
				key={index}
				className={classes.link}
				component={link.link ? 'a' : undefined}
				href={link.link}
			>
				{link.label}
			</Text>
		));

		return (
			<div className={classes.wrapper} key={group.title}>
				<Text className={classes.title}>{group.title}</Text>
				{links}
			</div>
		);
	});

	return (
		<footer className={classes.footer}>
			<Container className={classes.inner} size="xl">
				<div className={classes.logo}>
					<Text className={classes.title}>{projectName}</Text>
					<Text size="xs" c="dimmed" className={classes.description} mb="md">
						Site de guides pour (ré)installer Windows 10/11 au propre et faire
						des optimisations saines.
					</Text>
					{!isAuthenticated ? <NotAuthenticated /> : <Authenticated />}
				</div>
				<div className={classes.groups}>{groups}</div>
			</Container>
			<Container className={classes.afterFooter} size="xl">
				<Text c="dimmed" size="sm">
					Réalisé avec ❤️ par <Anchor href={devUrl}>{devName}</Anchor>,
					rédaction par <Anchor href={editorYtbUrl}>{editorName}</Anchor>
				</Text>

				<Group
					gap={0}
					className={classes.social}
					justify="flex-end"
					wrap="nowrap"
				>
					<ActionIcon
						size="lg"
						color="gray"
						variant="subtle"
						component={ExternalLinkUnstyled}
						href={editorXUrl}
					>
						<TbBrandTwitter size={18} />
					</ActionIcon>
					<ActionIcon
						size="lg"
						color="gray"
						variant="subtle"
						component={ExternalLinkUnstyled}
						href={editorYtbUrl}
					>
						<TbBrandYoutube size={18} />
					</ActionIcon>
					<ActionIcon
						size="lg"
						color="gray"
						variant="subtle"
						component={ExternalLinkUnstyled}
						href={helpUrl}
					>
						<TbBrandDiscord size={18} />
					</ActionIcon>
				</Group>
			</Container>
		</footer>
	);
}

const NotAuthenticated = () => (
	<Anchor component="a" href="/auth/login" className={classes.link} c="blue">
		Connexion
	</Anchor>
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
