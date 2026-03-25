import { Link } from '@adonisjs/inertia/react';
import { Data } from '@generated/data';
import { ExternalLinkStyled } from '~/components/generics/links/external_link_styled';
import { GuideList } from '~/components/guides/guide_list';
import { DISCORD_SUGGESTION_CHANNEL_URL, HELP_URL } from '~/consts/project';
import { useAuth } from '~/hooks/use_auth';

interface GuidesPageProps {
	guides: Data.Guide[];
}

export default function GuidesPage({ guides }: Readonly<GuidesPageProps>) {
	const { isAuthenticated } = useAuth();
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<h1 className="text-3xl font-normal leading-tight text-gray-900 dark:text-gray-100">
						Guides
					</h1>
					{isAuthenticated ? (
						<Link
							href="/guides/new"
							className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-900"
						>
							Ajouter un guide
						</Link>
					) : null}
				</div>
				<p className="text-gray-600 dark:text-gray-400">
					Vous souhaitez proposer un nouveau guide ou faire un retour ?
					<br />
					<ExternalLinkStyled href={HELP_URL} target="_blank" rel="noreferrer">
						Rejoignez le serveur Discord
					</ExternalLinkStyled>{' '}
					et faites une proposition dans le salon{' '}
					<ExternalLinkStyled
						href={DISCORD_SUGGESTION_CHANNEL_URL}
						target="_blank"
						rel="noreferrer"
					>
						idées-pour-le-serveur
					</ExternalLinkStyled>
					.
				</p>
			</div>
			{guides.length === 0 ? (
				<p className="text-gray-700 dark:text-gray-300">Aucun guide trouvé</p>
			) : null}
			{guides.length > 0 ? <GuideList guides={guides} /> : null}
		</div>
	);
}
