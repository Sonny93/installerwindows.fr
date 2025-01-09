import vine from '@vinejs/vine';

const youtubeVideoIdRegex = /^[a-zA-Z0-9_-]{11}$/;

export const videoValidator = vine.compile(
	vine.object({
		params: vine.object({
			videoId: vine.string().regex(youtubeVideoIdRegex).optional(),
		}),
	})
);
