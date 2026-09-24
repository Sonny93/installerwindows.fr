interface VideoHeaderProps {
	episodeNumber: number | null;
	episodeTitle: string;
	publishedAt: string;
}

export const VideoHeader = ({
	episodeNumber,
	episodeTitle,
	publishedAt,
}: Readonly<VideoHeaderProps>) => (
	<div className="flex flex-col gap-1">
		{episodeNumber === null ? null : (
			<p className="text-sm font-medium text-blue-600 dark:text-blue-300">
				Épisode {episodeNumber}
			</p>
		)}
		<h1 className="text-2xl font-normal leading-tight text-gray-900 dark:text-gray-100 md:text-3xl">
			{episodeTitle}
		</h1>
		<p className="text-sm text-gray-500 dark:text-gray-400">
			Publiée le {publishedAt}
		</p>
	</div>
);
