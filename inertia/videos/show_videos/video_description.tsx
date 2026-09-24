import { Card } from '@minimalstuff/ui';

import { LinkifiedText } from '~/videos/show_videos/linkified_text';

interface VideoDescriptionProps {
	description: string;
}

export const VideoDescription = ({
	description,
}: Readonly<VideoDescriptionProps>) => (
	<Card className="mt-2">
		<LinkifiedText
			text={description}
			className="whitespace-pre-wrap break-words"
		/>
	</Card>
);
