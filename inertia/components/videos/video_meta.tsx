import { urlify } from '#shared/utils/index';

interface VideoMetaProps {
	title: string;
	description: string;
	publishedAt: string;
}

export const VideoMeta = ({
	title,
	description,
	publishedAt,
}: Readonly<VideoMetaProps>) => (
	<>
		<div className="flex flex-col gap-0">
			<p className="text-sm text-gray-500 dark:text-gray-400">{publishedAt}</p>
			<h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 md:text-2xl">
				{title}
			</h2>
		</div>
		<div
			className="prose prose-sm dark:prose-invert mt-4 max-w-none whitespace-pre-wrap"
			dangerouslySetInnerHTML={{ __html: urlify(description) }}
		/>
	</>
);
