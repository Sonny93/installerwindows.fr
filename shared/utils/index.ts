export const slugify = (str: string = '') =>
	str
		.normalize('NFD')
		.replaceAll(' ', '-')
		.replaceAll(/[\u0300-\u036f'"=\(\)&_]/g, '')
		.replace(/^-+|-+(?=-|$)/g, '')
		.toLowerCase();
