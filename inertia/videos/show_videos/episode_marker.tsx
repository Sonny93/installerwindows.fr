import { cn } from '~/shared/lib/cn';
import type { EpisodeMarkerState } from '~/videos/show_videos/episode_marker_state';

interface EpisodeMarkerProps {
	episodeNumber: number | null;
	state: EpisodeMarkerState;
	className?: string;
}

const markerBase =
	'size-8 shrink-0 rounded-full grid place-items-center text-sm tabular-nums bg-gray-50 dark:bg-gray-800';

const markerByState: Record<EpisodeMarkerState, string> = {
	past: 'border border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300',
	current:
		'border-2 border-blue-500 ring-4 ring-blue-500/20 font-medium text-blue-600 dark:border-blue-400 dark:text-blue-300',
	upcoming:
		'border border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400 group-hover:border-blue-400',
};

export const EpisodeMarker = ({
	episodeNumber,
	state,
	className,
}: Readonly<EpisodeMarkerProps>) => (
	<span className={cn(markerBase, markerByState[state], className)}>
		{episodeNumber ?? <span className="size-1.5 rounded-full bg-current" />}
	</span>
);
