import { Link } from '@adonisjs/inertia/react';
import { Error404 } from '~/components/errors/error_404';
import { HelpButton } from '~/components/generics/help_button';

const NotFound = () => (
	<div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
		<div className="relative">
			<Error404 className="pointer-events-none absolute inset-0 opacity-75 text-gray-300 dark:text-gray-600" />
			<div className="relative z-[1] pt-[120px] sm:pt-[220px]">
				<h1 className="text-center font-sans text-3xl font-black text-gray-900 sm:text-[38px] dark:text-gray-100">
					Oups !
				</h1>
				<p className="mx-auto mt-8 max-w-[540px] text-center text-lg text-gray-600 dark:text-gray-400">
					La page que vous cherchez n'existe pas. Vous avez peut-être tapé
					l'adresse incorrectement, ou la page a été déplacée vers une autre
					URL.
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
					<HelpButton />
					<Link
						href="/"
						className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-transparent px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:focus:ring-offset-gray-900"
					>
						Retour à la page d'accueil
					</Link>
				</div>
			</div>
		</div>
	</div>
);

export default NotFound;
