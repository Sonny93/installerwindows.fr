export const slugify = (str: string = '') =>
	str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-zA-Z0-9]/g, '-')
		.toLowerCase();

export const urlify = (text: string) => {
	return text.replace(
		/(https?:\/\/[^\s]+)/g,
		(url: string) =>
			`<a href="${url}" rel="noreferrer" target="_blank">${url}</a>`
	);
};

export const getGithubRawUrl = (url: string) => {
	const isRaw = url.includes('raw.githubusercontent.com');
	const isGithubFile = url.includes('github.com');

	if (!isRaw && !isGithubFile) {
		throw new Error('Invalid Github URL');
	}

	if (isRaw) {
		return url;
	}

	return url.replace('github.com', 'raw.githubusercontent.com');
};
