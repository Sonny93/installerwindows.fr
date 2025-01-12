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

export const getGithubRawUrl = (url: string): string => {
	const githubRepoRegex =
		/^https?:\/\/(www\.)?github\.com\/(?<owner>[^\/]+)\/(?<repo>[^\/]+)\/blob\/(?<branch>[^\/]+)\/(?<path>.+\.md)$/;

	const rawContentRegex =
		/^https?:\/\/(www\.)?raw\.githubusercontent\.com\/(?<owner>[^\/]+)\/(?<repo>[^\/]+)\/(?<branch>[^\/]+)\/(?<path>.+\.md)$/;

	const githubMatch = url.match(githubRepoRegex);
	if (githubMatch) {
		const { owner, repo, branch, path } = githubMatch.groups!;

		return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
	}

	if (rawContentRegex.test(url)) {
		return url;
	}

	throw new Error("L'URL fournie n'est pas un fichier markdown GitHub valide.");
};
