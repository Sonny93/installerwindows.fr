type CommonBase = {
	id: number;
	createdAt: string;
	updatedAt: string;
};

export type Chapter = {
	id: string;
	name: string;
};

export type TocItem = {
	level: number;
	text: string;
	id: string;
};

export type Video = {
	id: string;
	title: string;
	thumbnail: string;
	description: string;
	url: string;
	publishedAt: string;
};

export type Guide = CommonBase & {
	title: string;
	slug: string;
	thumbnail: string;
	githubRawUrl: string;
};

export type Guides = Guide[];

export type Videos = Video[];
