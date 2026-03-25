import { SharedProps } from '@adonisjs/inertia/types';
import { usePage } from '@inertiajs/react';
import { Field } from '~/components/generics/footer/field';
import { TextIcon } from '~/components/generics/footer/text_icon';
import { UserCard } from '~/components/generics/footer/user_card/user_card';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import {
	DEV_URL,
	DISCORD_SUGGESTION_CHANNEL_URL,
	EDITOR_X_URL,
	EDITOR_YTB_URL,
	PROJECT_GITHUB_URL,
} from '~/consts/project';

interface FooterProps {
	layoutMaxWidth: string;
}

export function Footer({ layoutMaxWidth }: Readonly<FooterProps>) {
	const { version } = usePage<SharedProps>().props;
	return (
		<footer className="w-full py-10 bg-gray-100 dark:bg-gray-900">
			<div
				className="mx-auto flex w-full flex-col gap-8 px-4 md:px-6"
				style={{ maxWidth: layoutMaxWidth }}
			>
				<Field label="Installerwindows.fr">
					<div>
						<p className="max-w-[50%] font-light max-md:max-w-full text-gray-800 dark:text-gray-400">
							Guides pour (ré)installer Windows 11 au propre et faire des
							optimisations saines pour votre machine. Il s'agit de guides
							complets, que vous devriez pouvoir suivre quel que soit votre
							niveau en informatique.
						</p>
						<p className="mt-1 text-sm text-gray-500">v{version}</p>
					</div>
				</Field>
				<Field label="Liens utiles">
					<TextIcon
						icon="i-simple-icons-youtube"
						href={EDITOR_YTB_URL}
						external
					>
						Piwi
					</TextIcon>
					<TextIcon
						icon="i-simple-icons-discord"
						href={DISCORD_SUGGESTION_CHANNEL_URL}
						external
					>
						Discord
					</TextIcon>
					<TextIcon
						icon="i-simple-icons-github"
						href={PROJECT_GITHUB_URL}
						external
					>
						Github
					</TextIcon>
					<TextIcon icon="i-material-symbols-signal-wifi-4-bar" href="/status">
						Statut des services
					</TextIcon>
					<TextIcon icon="i-tabler-contract" href="/cgu">
						CGUs
					</TextIcon>
					<UserCard />
				</Field>
				<p className="font-light text-gray-800 dark:text-gray-200">
					Réalisé avec ❤️ par{' '}
					<ExternalLinkStyled href={DEV_URL}>Sonny</ExternalLinkStyled>,
					rédaction par{' '}
					<ExternalLinkStyled href={EDITOR_X_URL}>Piwi</ExternalLinkStyled>
				</p>
			</div>
		</footer>
	);
}
