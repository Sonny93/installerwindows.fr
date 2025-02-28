type CommonBase = {
	id: number;
	createdAt: string;
	updatedAt: string;
};

export type User = CommonBase & {
	fullname: string;
	avatarUrl: string;
	lastSeenAt: string;
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

type Auth =
	| {
			isAuthenticated: true;
			user: User;
	  }
	| {
			isAuthenticated: false;
			user: null;
	  };

export type InertiaPage<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	auth: Auth;
};
