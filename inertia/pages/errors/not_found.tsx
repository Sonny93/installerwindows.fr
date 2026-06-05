import { Link } from '@adonisjs/inertia/react';
import { HelpButton } from '~/components/generics/help_button';

const NotFound = () => (
	<div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
		>
			<div className="h-[400px] w-[600px] rounded-full bg-blue-500/3 dark:bg-blue-500/5 blur-3xl" />
		</div>

		<div className="relative flex flex-col items-center gap-6">
			<div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-gray-200 dark:border-white/8 bg-white dark:bg-[#111120] shadow-lg dark:shadow-black/30">
				<span className="text-4xl font-black text-gray-300 dark:text-slate-600">
					404
				</span>
			</div>

			<div className="flex flex-col gap-3">
				<h1 className="text-3xl text-gray-900 dark:text-slate-100 md:text-4xl">
					Page introuvable
				</h1>
				<p className="mx-auto max-w-[480px] text-base text-gray-600 dark:text-slate-400 leading-relaxed">
					La page que vous cherchez n'existe pas. Vous avez peut-être tapé
					l'adresse incorrectement, ou elle a été déplacée.
				</p>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-3 pt-2">
				<Link
					href="/"
					className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-colors no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#080811]"
				>
					<span className="i-tabler-home h-4 w-4" aria-hidden />
					Page d'accueil
				</Link>
				<HelpButton />
			</div>
		</div>
	</div>
);

export default NotFound;
