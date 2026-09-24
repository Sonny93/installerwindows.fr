import { Data } from '@generated/data';

import { urlFor } from '~/shared/lib/url_for';
import { EpisodeNavigationLink } from '~/videos/show_videos/episode_navigation_link';

interface EpisodeNavigationProps {
	previousVideo: Data.Video | undefined;
	nextVideo: Data.Video | undefined;
	firstVideo: Data.Video | undefined;
}

type NextLinkProps = {
	label: string;
	title: string;
	videoId: string;
};

/**
 * Resolves the next-episode link: the next video when there is one, otherwise
 * a link back to the first video of the series so the series can be replayed.
 */
function resolveNextLinkProps(
	nextVideo: Data.Video | undefined,
	firstVideo: Data.Video | undefined
): NextLinkProps | undefined {
	if (nextVideo) {
		return {
			label: 'Vidéo suivante',
			title: nextVideo.episodeTitle,
			videoId: nextVideo.id,
		};
	}
	if (firstVideo) {
		return {
			label: 'Revoir depuis le début',
			title: firstVideo.episodeTitle,
			videoId: firstVideo.id,
		};
	}
	return undefined;
}

export function EpisodeNavigation({
	previousVideo,
	nextVideo,
	firstVideo,
}: Readonly<EpisodeNavigationProps>) {
	const nextLinkProps = resolveNextLinkProps(nextVideo, firstVideo);

	return (
		<nav
			aria-label="Navigation entre les vidéos"
			className="grid gap-3 sm:grid-cols-2"
		>
			{previousVideo ? (
				<EpisodeNavigationLink
					href={urlFor('videos.show_videos', { videoId: previousVideo.id })}
					label="Vidéo précédente"
					title={previousVideo.episodeTitle}
					align="start"
				/>
			) : (
				<div aria-hidden="true" />
			)}
			{nextLinkProps ? (
				<EpisodeNavigationLink
					href={urlFor('videos.show_videos', {
						videoId: nextLinkProps.videoId,
					})}
					label={nextLinkProps.label}
					title={nextLinkProps.title}
					align="end"
				/>
			) : null}
		</nav>
	);
}
