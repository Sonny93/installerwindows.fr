import vine from '@vinejs/vine';

import { guideObject } from '#guides/validators/guide_schema';

export const createGuideValidator = vine.create(guideObject);
