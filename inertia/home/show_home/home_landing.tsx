import { GuidePathsSection } from '~/home/show_home/guide_paths_section';
import { HomeHelpSection } from '~/home/show_home/home_help_section';
import { HomeHero } from '~/home/show_home/home_hero';
import { HomeWhySection } from '~/home/show_home/home_why_section';

export const HomeLanding = () => (
	<div className="mx-auto flex w-full max-w-5xl flex-col gap-20 pt-4 md:gap-24 md:pt-10">
		<HomeHero />
		<GuidePathsSection />
		<HomeWhySection />
		<HomeHelpSection />
	</div>
);
