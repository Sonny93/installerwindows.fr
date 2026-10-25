import { HELP_URL } from '~/shared/consts/project';
import { ExternalLinkUnstyled } from '~/shared/links/external_link_unstyled';

export const HelpButton = () => (
	<ExternalLinkUnstyled
		href={HELP_URL}
		className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 motion-safe:transition-colors hover:border-blue-400 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-gray-600 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-300"
	>
		<span
			className="i-simple-icons-discord size-4 shrink-0"
			aria-hidden="true"
		/>
		Besoin d'aide ?
	</ExternalLinkUnstyled>
);
