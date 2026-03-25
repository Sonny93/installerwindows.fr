import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';
import { HELP_URL } from '~/consts/project';

export const HelpButton = () => (
	<ExternalLinkUnstyled
		href={HELP_URL}
		className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gray-600 to-cyan-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:from-gray-700 hover:to-cyan-600"
	>
		Besoin d'aide ?
	</ExternalLinkUnstyled>
);
