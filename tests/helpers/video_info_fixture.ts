import type { VideoInfo } from '#videos/youtube_service';

let sequence = 0;

/**
 * Builds a deterministic VideoInfo fixture for tests, with a valid
 * 11-character YouTube video id so it satisfies showVideosValidator's regex.
 * @param overrides Fields to override on the generated fixture.
 * @returns A complete VideoInfo object.
 */
export function makeVideoInfo(overrides: Partial<VideoInfo> = {}): VideoInfo {
	sequence += 1;
	const id = `fakeVideo${String(sequence).padStart(2, '0')}`;

	return {
		id,
		title: `Fake video ${sequence}`,
		thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
		description: `Fake video description ${sequence}.`,
		url: `https://www.youtube.com/watch?v=${id}`,
		publishedAt: '1 janv. 2024',
		...overrides,
	};
}
