import { forbiddenValues } from '#validators/rules/forbidden_values';
import vine from '@vinejs/vine';

const githubRegex =
	/^(https?:\/\/)?(github\.com|raw\.githubusercontent\.com)\/.*$/;
const urlRegex = /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/;

const addHttpsIfNotPresent = (url: string) =>
	url.startsWith('http://') || url.startsWith('https://')
		? url
		: `https://${url}`;

export const createGuideValidator = vine.compile(
	vine.object({
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
	})
);
