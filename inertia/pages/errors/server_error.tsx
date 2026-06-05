import { Button } from '@minimalstuff/ui';
import { HelpButton } from '~/components/generics/help_button';
import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';

const DEFAULT_ERROR_MESSAGE =
	'Une erreur côté serveur est survenue. Si le problème persiste, veuillez nous contacter.';

interface ServerErrorProps {
	message?: string;
	service?: string;
	link?: string;
}

const ServerError = ({
	message = DEFAULT_ERROR_MESSAGE,
	service,
	link,
}: ServerErrorProps) => (
	<div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
		>
			<div className="h-[400px] w-[600px] rounded-full bg-red-500/3 dark:bg-red-500/5 blur-3xl" />
		</div>

		<div className="relative flex flex-col items-center gap-6">
			<div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-red-200/60 dark:border-red-500/20 bg-red-50 dark:bg-red-500/8 shadow-lg dark:shadow-black/30">
				<span className="text-4xl font-black text-red-300 dark:text-red-600">
					500
				</span>
			</div>

			<div className="flex flex-col gap-3">
				<h1 className="text-3xl text-gray-900 dark:text-slate-100 md:text-4xl">
					Erreur serveur
				</h1>
				<p className="mx-auto max-w-[480px] text-base text-gray-600 dark:text-slate-400 leading-relaxed">
					{message}
				</p>
			</div>

			{link ? (
				<ExternalLinkUnstyled
					href={link}
					className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-slate-300 transition-colors hover:bg-gray-50 dark:hover:bg-white/8 no-underline"
				>
					<span className="i-tabler-external-link h-4 w-4" aria-hidden />
					Lien vers la ressource {service}
				</ExternalLinkUnstyled>
			) : null}

			<div className="flex flex-wrap items-center justify-center gap-3 pt-2">
				<Button variant="outline" onClick={() => window.location.reload()}>
					<span className="i-tabler-refresh h-4 w-4" aria-hidden />
					Rafraîchir la page
				</Button>
				<HelpButton />
			</div>
		</div>
	</div>
);

export default ServerError;
