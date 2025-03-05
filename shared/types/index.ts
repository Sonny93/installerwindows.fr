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

export type Review = {
	id: number;
	title: string;
	url: string;
};

export const PeriphType = ['open', 'closed'] as const;
export type PeriphType = (typeof PeriphType)[number];

export const PeriphConnectivity = ['USB', 'Bluetooth', 'Jack'] as const;
export type PeriphConnectivity = (typeof PeriphConnectivity)[number];

export const PeriphMicrophone = [
	'cardioid',
	'omnidirectional',
	'stereo',
] as const;
export type PeriphMicrophone = (typeof PeriphMicrophone)[number];

export const PeriphSize = ['full', 'tenkeyless', '87', '60', '40'] as const;
export type PeriphSize = (typeof PeriphSize)[number];

export const PeriphPanel = ['IPS', 'VA', 'TN', 'OLED', 'QD-OLED'] as const;
export type PeriphPanel = (typeof PeriphPanel)[number];

export const PeriphShape = ['ergonomic', 'symmetrical'] as const;
export type PeriphShape = (typeof PeriphShape)[number];

export type BasePeriph = {
	brand: string;
	model: string;
	reviews: Review[];
	price: number;
	notes: number;
} & CommonBase;

export type Periph = BasePeriph & {
	wire: boolean;
	microOnWire: boolean;
};

export type Headset = BasePeriph & {
	wire: boolean;
	type: PeriphType;
	connectivity: PeriphConnectivity;
	microphone: boolean;
};

export type Keyboard = BasePeriph & {
	size: PeriphSize;
	switches: string;
};

export type Earphone = BasePeriph & {
	wire: boolean;
	microOnWire: boolean;
};

export type Microphone = BasePeriph & {
	connectivity: PeriphConnectivity;
	microphoneType: PeriphMicrophone;
};

export type Monitor = BasePeriph & {
	size: number;
	resolution: string;
	refreshRate: number;
	panel: PeriphPanel;
	vesaSupport: boolean;
};

export type MousePad = BasePeriph & {
	slideSpeed: number;
	covering: boolean;
	size: PeriphSize;
};

export type Mouse = BasePeriph & {
	wire: boolean;
	shape: PeriphShape;
	weight: number;
};

export type CountPerCategory = {
	headset: number;
	keyboard: number;
	monitor: number;
	mouse: number;
	mousepad: number;
	microphone: number;
	earphone: number;
};
