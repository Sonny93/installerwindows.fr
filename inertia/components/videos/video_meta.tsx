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
		<div className="flex flex-col gap-0.5">
			<p className="text-sm text-gray-600 dark:text-slate-400">{publishedAt}</p>
			<h2 className="text-xl text-gray-900 dark:text-slate-100 md:text-2xl">
				{title}
			</h2>
		</div>
		<div
			className="prose prose-sm dark:prose-invert mt-4 max-w-none whitespace-pre-wrap"
			dangerouslySetInnerHTML={{ __html: urlify(description) }}
		/>
	</>
);
