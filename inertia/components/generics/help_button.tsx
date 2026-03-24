import { Button } from '@mantine/core';
import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';
import { HELP_URL } from '~/consts/project';

export const HelpButton = () => (
	<Button
		variant="gradient"
		size="xs"
		radius="xl"
		component={ExternalLinkUnstyled}
		href={HELP_URL}
	>
		Besoin d'aide ?
	</Button>
);
