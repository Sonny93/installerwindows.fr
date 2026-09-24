export const slugify = (value: string = ''): string =>
	value
		.trim()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-zA-Z0-9]/g, '-')
		.toLowerCase();
