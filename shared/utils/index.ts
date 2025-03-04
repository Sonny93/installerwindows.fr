export const slugify = (str: string = '') =>
	str
		.trim()
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

const githubRepoRegex =
	/^https?:\/\/(www\.)?github\.com\/(?<owner>[^\/]+)\/(?<repo>[^\/]+)\/blob\/(?<branch>[^\/]+)\/(?<path>.+\.md)$/;
const rawContentRegex =
	/^https?:\/\/(www\.)?raw\.githubusercontent\.com\/(?<owner>[^\/]+)\/(?<repo>[^\/]+)\/(?<branch>[^\/]+)\/(?<path>.+\.md)$/;

export function validateAndTransformMarkdownUrl(url: string): string {
	const githubMatch = url.match(githubRepoRegex);
	if (githubMatch) {
		const { owner, repo, branch, path } = githubMatch.groups!;
		return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
	}

	if (rawContentRegex.test(url)) {
		return url;
	}

	throw new Error("L'URL fournie n'est pas un fichier markdown GitHub valide.");
}

export function transformRawToGithubUrl(url: string): string {
	const rawMatch = url.match(rawContentRegex);
	if (rawMatch) {
		const { owner, repo, branch, path } = rawMatch.groups!;
		return `https://github.com/${owner}/${repo}/blob/${branch}/${path}`;
	}

	if (githubRepoRegex.test(url)) {
		return url;
	}

	throw new Error("L'URL fournie n'est pas un fichier GitHub valide.");
}
