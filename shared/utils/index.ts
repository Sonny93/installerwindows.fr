export const slugify = (str: string = '') =>
	str
		.normalize('NFD')
		.replaceAll(' ', '-')
		.replaceAll(/[\u0300-\u036f'"=\(\)&_]/g, '')
		.replace(/^-+|-+(?=-|$)/g, '')
		.toLowerCase();

export const urlify = (text: string) => {
	return text.replace(
		/(https?:\/\/[^\s]+)/g,
		(url: string) =>
			`<a href="${url}" rel="noreferrer" target="_blank">${url}</a>`
	);
};
