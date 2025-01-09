type CommonBase = {
	id: number;
	createdAt: string;
	updatedAt: string;
};

export type User = CommonBase & {
	email: string;
	fullname: string;
	avatarUrl: string;
	isAdmin: boolean;
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
};

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
