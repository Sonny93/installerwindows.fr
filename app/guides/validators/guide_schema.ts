import vine from '@vinejs/vine';

import { slugify } from '#libs/slugify';
import { forbiddenValues } from '#guides/validators/rules/forbidden_values';

const githubRegex =
	/^(https?:\/\/)?(github\.com|raw\.githubusercontent\.com)\/.*$/;
const urlRegex = /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/;

const addHttpsIfNotPresent = (url: string) =>
	url.startsWith('http://') || url.startsWith('https://')
		? url
		: `https://${url}`;

/**
 * Shared field schema for a guide, reused by the create and edit validators
 * so both actions validate title, thumbnail, githubUrl, and slug identically.
 */
export const guideObject = vine.object({
	title: vine
		.string()
		.minLength(3)
		.maxLength(255)
		.trim()
		.use(forbiddenValues(['new'])),
	thumbnail: vine
		.string()
		.trim()
		.regex(urlRegex)
		.transform(addHttpsIfNotPresent),
	githubUrl: vine
		.string()
		.trim()
		.regex(githubRegex)
		.transform(addHttpsIfNotPresent),
	slug: vine
		.string()
		.trim()
		.transform((value, field) => slugify(value ?? field.parent.title)),
});
