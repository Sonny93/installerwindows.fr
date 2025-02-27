import { slugify } from '#shared/utils/index';
import { forbiddenValues } from '#validators/rules/forbidden_values';
import vine from '@vinejs/vine';

const githubRegex =
	/^(https?:\/\/)?(github\.com|raw\.githubusercontent\.com)\/.*$/;
const urlRegex = /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/;

const addHttpsIfNotPresent = (url: string) =>
	url.startsWith('http://') || url.startsWith('https://')
		? url
		: `https://${url}`;

const guideObject = vine.object({
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

export const guideValidator = vine.compile(guideObject);

export const editGuideValidator = vine.compile(
	vine.object({
		...guideObject.getProperties(),
		params: vine.object({
			slug: vine.string().trim(),
		}),
	})
);
