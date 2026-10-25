import { GuidePathCard } from '~/home/show_home/guide_path_card';
import { SectionHeading } from '~/home/show_home/section_heading';
import { urlFor } from '~/shared/lib/url_for';

export const GuidePathsSection = () => (
	<section
		aria-labelledby="guide-paths-heading"
		className="flex flex-col gap-6"
	>
		<SectionHeading id="guide-paths-heading">
			Choisir votre guide
		</SectionHeading>
		<div className="grid gap-4 md:grid-cols-2">
			<GuidePathCard
				href={urlFor('videos.show_videos')}
				iconClass="i-tabler-player-play"
				audience="Tous niveaux"
				title="Guide vidéo"
				description="Détaillé et accessible à tous les niveaux : chaque étape est montrée et expliquée."
				callToAction="Regarder le guide"
			/>
			<GuidePathCard
				href={urlFor('guides.show_guide', { guideSlug: 'windows-11' })}
				iconClass="i-tabler-file-text"
				audience="Utilisateurs avancés"
				title="Guide texte"
				description="Plus succinct, pensé pour les utilisateurs avancés qui veulent aller à l'essentiel."
				callToAction="Lire le guide"
			/>
		</div>
		<p className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
			<span
				className="i-tabler-info-circle mt-0.5 size-4 shrink-0"
				aria-hidden="true"
			/>
			<span>
				Les chapitres sont communs : vous pouvez passer de l'un à l'autre à tout
				moment.
			</span>
		</p>
	</section>
);
