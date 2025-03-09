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

export const ProductType = [
	'mouse',
	'keyboard',
	'monitor',
	'headset',
	'earphone',
	'microphone',
	'mousepad',
] as const;
export type ProductType = (typeof ProductType)[number];

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

export type Product = {
	brand: string;
	model: string;
	reviews: Review[];
	price: number;
	notes: number;
} & CommonBase;

export type Periph = CommonBase & {
	wire: boolean;
	microOnWire: boolean;
	product: Product;
};

export type Headset = CommonBase & {
	wire: boolean;
	type: PeriphType;
	connectivity: PeriphConnectivity;
	microphone: boolean;
	product: Product;
};

export type Keyboard = CommonBase & {
	size: PeriphSize;
	switches: string;
	product: Product;
};

export type Earphone = CommonBase & {
	wire: boolean;
	microOnWire: boolean;
	product: Product;
};

export type Microphone = CommonBase & {
	connectivity: PeriphConnectivity;
	microphoneType: PeriphMicrophone;
	product: Product;
};

export type Monitor = CommonBase & {
	size: number;
	resolution: string;
	refreshRate: number;
	panel: PeriphPanel;
	vesaSupport: boolean;
	product: Product;
};

export type MousePad = CommonBase & {
	slideSpeed: number;
	covering: boolean;
	size: PeriphSize;
	product: Product;
};

export type Mouse = CommonBase & {
	wire: boolean;
	shape: PeriphShape;
	weight: number;
	product: Product;
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
