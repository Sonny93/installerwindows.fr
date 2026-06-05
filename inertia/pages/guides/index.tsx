import { Link } from '@adonisjs/inertia/react';
import { Data } from '@generated/data';
import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';
import { GuideList } from '~/components/guides/guide_list';
import { DISCORD_SUGGESTION_CHANNEL_URL, HELP_URL } from '~/consts/project';
import { useAuth } from '~/hooks/use_auth';

interface GuidesPageProps {
	guides: Data.Guide[];
}

export default function GuidesPage({ guides }: Readonly<GuidesPageProps>) {
	const { isAuthenticated } = useAuth();
	return (
		<div className="flex flex-col gap-10">
			<PageHeader isAuthenticated={isAuthenticated} guideCount={guides.length} />
			<GuideList guides={guides} />
			{guides.length === 0 ? (
				<p className="text-gray-600 dark:text-slate-400">Aucun guide trouvé.</p>
			) : null}
		</div>
	);
}

interface PageHeaderProps {
	isAuthenticated: boolean;
	guideCount: number;
}

const PageHeader = ({ isAuthenticated, guideCount }: Readonly<PageHeaderProps>) => (
	<div className="flex flex-col gap-6">
		<div className="flex flex-wrap items-start justify-between gap-4">
			<div className="flex flex-col gap-1">
				<span className="text-xs font-medium uppercase tracking-widest text-blue-600 dark:text-blue-400">
					Documentation
				</span>
				<h1 className="text-4xl text-gray-900 dark:text-slate-100">
					Guides Windows 11
				</h1>
				{guideCount > 0 ? (
					<p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
						{guideCount} guide{guideCount > 1 ? 's' : ''} disponible{guideCount > 1 ? 's' : ''}
					</p>
				) : null}
			</div>
			{isAuthenticated ? (
				<Link
					href="/guides/new"
					className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-sm font-medium text-white transition-colors no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#080811]"
				>
					<span className="i-tabler-plus h-4 w-4" aria-hidden />
					Ajouter un guide
				</Link>
			) : null}
		</div>

		<aside className="flex items-start gap-3 rounded-xl border border-[#5865F2]/20 bg-[#5865F2]/5 dark:bg-[#5865F2]/8 px-4 py-3.5">
			<span
				className="i-simple-icons-discord h-5 w-5 shrink-0 text-[#5865F2] dark:text-[#7289DA] mt-0.5"
				aria-hidden
			/>
			<p className="text-sm text-gray-700 dark:text-slate-300">
				Vous souhaitez proposer un guide ou faire un retour ?{' '}
				<ExternalLinkUnstyled
					href={HELP_URL}
					className="font-medium text-[#5865F2] dark:text-[#7289DA] hover:underline"
				>
					Rejoignez le Discord
				</ExternalLinkUnstyled>{' '}
				et ouvrez une suggestion dans{' '}
				<ExternalLinkUnstyled
					href={DISCORD_SUGGESTION_CHANNEL_URL}
					className="font-medium text-[#5865F2] dark:text-[#7289DA] hover:underline"
				>
					#idées-pour-le-serveur
				</ExternalLinkUnstyled>
				.
			</p>
		</aside>
	</div>
);
