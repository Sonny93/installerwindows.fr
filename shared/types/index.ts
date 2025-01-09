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
};

export type Videos = Video[];
