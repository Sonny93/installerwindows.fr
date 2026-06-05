import { Link } from '@adonisjs/inertia/react';
import { Data } from '@generated/data';
import { GuideCard } from '~/components/guides/card/guide_card';

interface GuideListProps {
	guides: Data.Guide[];
}

export const GuideList = ({ guides }: Readonly<GuideListProps>) => {
	if (guides.length === 0) return null;

	const [featured, ...rest] = guides;

	return (
		<div className="flex flex-col gap-8">
			<FeaturedGuideCard guide={featured} />
			{rest.length > 0 ? (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{rest.map((guide) => (
						<GuideCard key={guide.id} guide={guide} />
					))}
				</div>
			) : null}
		</div>
	);
};

const FeaturedGuideCard = ({ guide }: { guide: Data.Guide }) => (
	<Link
		href={`/guides/${guide.slug}`}
		className="group flex flex-col md:flex-row rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111120] transition-all duration-300 no-underline hover:border-blue-500/25 dark:hover:border-blue-500/20 hover:shadow-2xl dark:hover:shadow-blue-500/5 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f9fc] dark:focus-visible:ring-offset-[#080811]"
	>
		<div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
			<img
				src={guide.thumbnail}
				alt={guide.title}
				className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
		</div>
		<div className="flex flex-col justify-center gap-4 p-6 md:p-10">
			<span className="text-xs uppercase tracking-widest text-blue-500 dark:text-blue-400">
				À la une
			</span>
			<h2 className="text-2xl md:text-3xl text-gray-900 dark:text-slate-100 leading-snug">
				{guide.title}
			</h2>
			<p className="text-sm text-gray-600 dark:text-slate-400">{guide.createdAt}</p>
			<div className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
				Lire le guide
				<span className="i-tabler-arrow-right h-4 w-4" aria-hidden />
			</div>
		</div>
	</Link>
);
