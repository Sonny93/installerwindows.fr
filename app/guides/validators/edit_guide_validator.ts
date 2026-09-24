import vine from '@vinejs/vine';

import { guideObject } from '#guides/validators/guide_schema';

export const editGuideValidator = vine.create(
	vine.object({
		...guideObject.getProperties(),
		params: vine.object({
			slug: vine.string().trim(),
		}),
	})
);
