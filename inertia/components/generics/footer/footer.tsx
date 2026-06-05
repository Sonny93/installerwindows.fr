import { SharedProps } from '@adonisjs/inertia/types';
import { usePage } from '@inertiajs/react';
import { TextIcon } from '~/components/generics/footer/text_icon';
import { UserCard } from '~/components/generics/footer/user_card/user_card';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import {
    DEV_URL,
    DISCORD_SUGGESTION_CHANNEL_URL,
    EDITOR_X_URL,
    EDITOR_YTB_URL,
    PROJECT_GITHUB_URL,
    PROJECT_NAME,
} from '~/consts/project';

interface FooterProps {
	layoutMaxWidth: string;
}

export function Footer({ layoutMaxWidth }: Readonly<FooterProps>) {
	const { version } = usePage<SharedProps>().props;
	return (
		<footer className="w-full border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#0a0a12]">
			<div
				className="mx-auto w-full px-4 py-14 md:px-6"
				style={{ maxWidth: layoutMaxWidth }}
			>
				<div className="grid grid-cols-1 gap-10 md:grid-cols-3">
					<div className="flex flex-col gap-4">
						<p className="text-base text-gray-900 dark:text-white">
							{PROJECT_NAME}
						</p>
						<p className="text-sm font-light leading-relaxed text-gray-600 dark:text-slate-400 max-w-xs">
							Guides pour (ré)installer Windows 11 au propre et faire des
							optimisations saines pour votre machine.
						</p>
						<p className="text-xs text-gray-500 dark:text-slate-500">
							v{version}
						</p>
					</div>

					<div className="flex flex-col gap-4">
						<p className="text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400">
							Contenu
						</p>
						<div className="flex flex-col gap-3">
							<TextIcon icon="i-simple-icons-youtube" href={EDITOR_YTB_URL} external>
								Piwi — YouTube
							</TextIcon>
							<TextIcon icon="i-simple-icons-github" href={PROJECT_GITHUB_URL} external>
								GitHub
							</TextIcon>
							<TextIcon icon="i-material-symbols-signal-wifi-4-bar" href="/status">
								Statut des services
							</TextIcon>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<p className="text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400">
							Communauté
						</p>
						<div className="flex flex-col gap-3">
							<TextIcon
								icon="i-simple-icons-discord"
								href={DISCORD_SUGGESTION_CHANNEL_URL}
								external
							>
								Discord — Suggestions
							</TextIcon>
							<TextIcon icon="i-tabler-contract" href="/cgu">
								CGUs
							</TextIcon>
							<UserCard />
						</div>
					</div>
				</div>

				<div className="mt-12 border-t border-gray-100 dark:border-white/5 pt-8">
					<p className="text-sm font-light text-gray-500 dark:text-slate-500">
						Réalisé avec ❤️ par{' '}
						<ExternalLinkStyled href={DEV_URL}>Sonny</ExternalLinkStyled>
						, rédaction par{' '}
						<ExternalLinkStyled href={EDITOR_X_URL}>Piwi</ExternalLinkStyled>
					</p>
				</div>
			</div>
		</footer>
	);
}
