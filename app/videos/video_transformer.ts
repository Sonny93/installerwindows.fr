import { BaseTransformer } from '@adonisjs/core/transformers';

import type { VideoInfo } from '#videos/youtube_service';

const EPISODE_TITLE_PATTERN = /^(\d+)\s*-\s*(.+)$/;

type EpisodeInfo = {
	episodeNumber: number | null;
	episodeTitle: string;
};

export default class VideoTransformer extends BaseTransformer<VideoInfo> {
	toObject() {
		return {
			...this.pick(this.resource, ['id', 'title']),
			...this.parseEpisode(this.resource.title),
		};
	}

	forPlayer() {
		return {
			...this.toObject(),
			...this.pick(this.resource, ['description', 'publishedAt']),
		};
	}

	/**
	 * Splits a playlist title such as "3 - Installer ses pilotes" into its episode
	 * number and title. A title without the numeric prefix has no episode number.
	 * @param title Raw video title from the playlist.
	 * @returns The parsed episode number and title.
	 */
	private parseEpisode(title: string): EpisodeInfo {
		const match = EPISODE_TITLE_PATTERN.exec(title);
		if (match === null) return { episodeNumber: null, episodeTitle: title };

		const [, episodeNumber, episodeTitle] = match;
		return {
			episodeNumber: Number(episodeNumber),
			episodeTitle: episodeTitle.trim(),
		};
	}
}
