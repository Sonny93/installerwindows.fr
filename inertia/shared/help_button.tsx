import { HELP_URL } from '~/shared/consts/project';
import { ExternalLinkUnstyled } from '~/shared/links/external_link_unstyled';

export const HelpButton = () => (
	<ExternalLinkUnstyled
		href={HELP_URL}
		className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gray-600 to-cyan-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:from-gray-700 hover:to-cyan-600"
	>
		Besoin d'aide ?
	</ExternalLinkUnstyled>
);
