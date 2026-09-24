import vine from '@vinejs/vine';

/**
 * Validates the shape of a YouTube Data API v3 `playlistItems` response.
 * Only the fields the app actually reads are declared; every object level
 * allows unknown properties since the real API response carries many more
 * fields (kind, etag, thumbnails, channelTitle, …) that the app ignores.
 */
export const youtubePlaylistItemsValidator = vine.create(
	vine
		.object({
			items: vine.array(
				vine
					.object({
						snippet: vine
							.object({
								title: vine.string(),
								description: vine.string(),
								publishedAt: vine.string(),
								resourceId: vine
									.object({
										videoId: vine.string(),
									})
									.allowUnknownProperties(),
							})
							.allowUnknownProperties(),
					})
					.allowUnknownProperties()
			),
		})
		.allowUnknownProperties()
);
