import { helpUrl } from '#config/project';
import { Button } from '@mantine/core';
import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';

export const HelpButton = () => (
	<Button
		variant="gradient"
		size="xs"
		radius="xl"
		component={ExternalLinkUnstyled}
		href={helpUrl}
	>
		Besoin d'aide ?
	</Button>
);
