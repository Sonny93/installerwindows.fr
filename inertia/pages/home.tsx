import { InternalLink } from '~/components/generics/links/internal_link';
import { MarkdownBuilder } from '~/components/markdown/builder/markdown_builder';
import { PROJECT_NAME } from '~/consts/project';

interface HomePageProps {
	html: string;
}

const HomePage = ({ html }: HomePageProps) => (
	<div className="flex flex-col gap-20">
		<Hero />
		<section>
			<MarkdownBuilder html={html} />
		</section>
	</div>
);

const Hero = () => (
	<section className="relative flex flex-col items-center text-center gap-6 py-20 md:py-28">
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 flex items-center justify-center"
		>
			<div className="h-[500px] w-[700px] rounded-full bg-blue-500/5 dark:bg-blue-500/8 blur-3xl" />
		</div>

		<span className="relative inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/8 dark:bg-blue-500/10 px-4 py-1.5 text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400">
			<span className="i-tabler-brand-windows h-3.5 w-3.5" aria-hidden />
			Windows 11
		</span>

		<h1 className="relative text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white leading-tight max-w-3xl">
			{PROJECT_NAME.split('.')[0]}
			<span className="text-blue-500 dark:text-blue-400">.fr</span>
		</h1>

		<p className="relative text-lg text-gray-600 dark:text-slate-400 max-w-xl leading-relaxed">
			Guides complets pour (ré)installer Windows 11 et optimiser votre machine,
			quel que soit votre niveau en informatique.
		</p>

		<div className="relative flex flex-wrap items-center justify-center gap-3 pt-2">
			<InternalLink
				href="/guides"
				className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-colors no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#080811]"
			>
				<span className="i-tabler-book h-4 w-4" aria-hidden />
				Voir les guides
			</InternalLink>
			<InternalLink
				href="/videos"
				className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-slate-300 transition-colors hover:bg-gray-50 dark:hover:bg-white/8 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#080811]"
			>
				<span className="i-tabler-player-play h-4 w-4" aria-hidden />
				Voir les vidéos
			</InternalLink>
		</div>
	</section>
);

export default HomePage;
