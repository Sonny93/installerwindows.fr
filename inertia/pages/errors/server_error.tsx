import { Button } from '@minimalstuff/ui';
import { Error500 } from '~/components/errors/error_500';
import { HelpButton } from '~/components/generics/help_button';

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
	<div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
		<div className="relative">
			<Error500 className="pointer-events-none absolute inset-0 opacity-75 text-gray-300 dark:text-gray-600" />
			<div className="relative z-[1] pt-[120px] sm:pt-[220px]">
				<h1 className="text-center font-sans text-3xl font-black text-gray-900 sm:text-[38px] dark:text-gray-100">
					Erreur serveur
				</h1>
				<p className="mx-auto mt-8 max-w-[540px] text-center text-lg text-gray-600 dark:text-gray-400">
					{message} <br />
					{link ? (
						<>
							En attendant que le problème soit résolu, vous pouvez consulter le
							lien vers la ressource <br />
							<a
								href={link}
								target="_blank"
								rel="noreferrer"
								className="mt-4 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-gray-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-gray-700 hover:to-cyan-600"
							>
								Lien vers la ressource {service}
							</a>
						</>
					) : null}
				</p>
				<p className="mx-auto mt-8 max-w-[540px] text-center text-lg text-gray-600 dark:text-gray-400">
					Rafraîchir la page pour essayer de résoudre le problème.
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
					<HelpButton />
					<Button variant="outline" onClick={() => window.location.reload()}>
						Rafraîchir la page
					</Button>
				</div>
			</div>
		</div>
	</div>
);

export default ServerError;
