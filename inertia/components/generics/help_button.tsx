import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';
import { HELP_URL } from '~/consts/project';

export const HelpButton = () => (
	<ExternalLinkUnstyled
		href={HELP_URL}
		className="inline-flex items-center justify-center rounded-full border border-blue-500/30 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/8 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 transition-colors hover:bg-blue-100 dark:hover:bg-blue-500/15"
	>
		Besoin d'aide ?
	</ExternalLinkUnstyled>
);
