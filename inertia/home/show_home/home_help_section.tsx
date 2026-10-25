import { SectionHeading } from '~/home/show_home/section_heading';
import { HELP_URL } from '~/shared/consts/project';
import { ExternalLinkStyled } from '~/shared/links/external_link_styled';

export const HomeHelpSection = () => (
	<section
		aria-labelledby="help-heading"
		className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 md:flex-row md:items-center md:justify-between md:gap-8 dark:border-gray-700 dark:bg-gray-900/60"
	>
		<div className="flex flex-col gap-3">
			<span
				className="i-simple-icons-discord size-8 text-blue-700 dark:text-blue-300"
				aria-hidden="true"
			/>
			<SectionHeading id="help-heading">Besoin d'aide&nbsp;?</SectionHeading>
			<p className="max-w-prose text-gray-600 dark:text-gray-400">
				Un problème avec votre PC ou une question sur le guide&nbsp;? La
				communauté du Discord d'entraide informatique peut vous aider.
			</p>
		</div>
		<ExternalLinkStyled
			href={HELP_URL}
			className="shrink-0 self-start rounded-lg border border-gray-300 px-4 py-2 text-center font-medium text-blue-700 hover:border-blue-400 hover:text-blue-700 motion-safe:transition-colors md:self-center dark:border-gray-600 dark:text-blue-300 dark:hover:border-blue-400 dark:hover:text-blue-300"
		>
			Rejoindre le Discord d'entraide
		</ExternalLinkStyled>
	</section>
);
