import type { EpisodeMarkerState } from '~/videos/show_videos/episode_marker_state';
import type { EpisodeRailSegmentColor } from '~/videos/show_videos/episode_rail_segment_color';

interface EpisodeRailItemProgress {
	state: EpisodeMarkerState;
	segmentAbove: EpisodeRailSegmentColor;
	segmentBelow: EpisodeRailSegmentColor;
}

function resolveMarkerState(
	index: number,
	currentIndex: number
): EpisodeMarkerState {
	if (index < currentIndex) return 'past';
	if (index === currentIndex) return 'current';
	return 'upcoming';
}

/**
 * Resolves the color of the half-segment connecting this item to the
 * previous one. Blue up to and including the current marker; gray after.
 * The first item has nothing to connect to above it.
 */
function resolveSegmentAbove(
	index: number,
	currentIndex: number
): EpisodeRailSegmentColor {
	if (index === 0) return 'none';
	return index <= currentIndex ? 'blue' : 'gray';
}

/**
 * Resolves the color of the half-segment connecting this item to the next
 * one. Blue only covers the stretch strictly before the current marker; the
 * segment below the current marker itself, and every segment after it, is
 * gray. The last item has nothing to connect to below it.
 */
function resolveSegmentBelow(
	index: number,
	currentIndex: number,
	videoCount: number
): EpisodeRailSegmentColor {
	if (index === videoCount - 1) return 'none';
	return index < currentIndex ? 'blue' : 'gray';
}

/**
 * Resolves an episode rail item's marker state and connecting half-segment
 * colors, relative to the current video's index within the list.
 * @param index Index of this item within the video list.
 * @param currentIndex Index of the current video within the video list.
 * @param videoCount Total number of videos in the list.
 * @returns The marker state and both half-segment colors for this item.
 */
export function resolveEpisodeRailItemProgress(
	index: number,
	currentIndex: number,
	videoCount: number
): EpisodeRailItemProgress {
	return {
		state: resolveMarkerState(index, currentIndex),
		segmentAbove: resolveSegmentAbove(index, currentIndex),
		segmentBelow: resolveSegmentBelow(index, currentIndex, videoCount),
	};
}
