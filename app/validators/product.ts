import {
	KeyboardSize,
	MousePadSpeed,
	PeriphConnectivity,
	PeriphMicrophone,
	PeriphPanel,
	PeriphShape,
	PeriphType,
	ProductType,
} from '#shared/types/index';
import { ALLOWED_IMAGE_EXTENSIONS, MAX_IMAGE_SIZE } from '#shared/utils/index';
import vine from '@vinejs/vine';

export const productTypeValidator = vine.compile(
	vine.object({
		params: vine.object({
			productType: vine.enum(ProductType),
		}),
	})
);

export const productValidator = vine.object({
	brand: vine.string(),
	thumbnail: vine.file({
		extnames: ALLOWED_IMAGE_EXTENSIONS,
		size: MAX_IMAGE_SIZE,
	}),
	reference: vine.string(),
	recommendedPrice: vine.number(),
	additionalInfo: vine.string().nullable(),
	affiliateLinks: vine
		.array(
			vine.object({
				label: vine.string(),
				url: vine.string(),
			})
		)
		.parse((value) => value ?? []),
	reviews: vine
		.array(
			vine.object({
				label: vine.string(),
				url: vine.string(),
			})
		)
		.parse((value) => value ?? []),
});

export const mouseValidator = vine.compile(
	vine.object({
		...productValidator.getProperties(),
		wire: vine.boolean().parse((value) => value ?? false),
		shape: vine.enum(PeriphShape),
		weight: vine.number(),
	})
);

export const keyboardValidator = vine.compile(
	vine.object({
		...productValidator.getProperties(),
		size: vine.enum(KeyboardSize),
		switches: vine.string(),
	})
);

export const monitorValidator = vine.compile(
	vine.object({
		...productValidator.getProperties(),
		size: vine.number(),
		resolution: vine.string(),
		refreshRate: vine.number(),
		panel: vine.enum(PeriphPanel),
		vesaSupport: vine.boolean(),
	})
);

export const headsetValidator = vine.compile(
	vine.object({
		...productValidator.getProperties(),
		type: vine.enum(PeriphType),
		connectivity: vine.enum(PeriphConnectivity),
		microphone: vine.boolean(),
	})
);

export const earphoneValidator = vine.compile(
	vine.object({
		...productValidator.getProperties(),
		wire: vine.boolean(),
		microOnWire: vine.boolean(),
	})
);

export const microphoneValidator = vine.compile(
	vine.object({
		...productValidator.getProperties(),
		connectivity: vine.enum(PeriphConnectivity),
		microphoneType: vine.enum(PeriphMicrophone),
	})
);

export const mousePadValidator = vine.compile(
	vine.object({
		...productValidator.getProperties(),
		slideSpeed: vine.enum(MousePadSpeed),
		covering: vine.boolean(),
		size: vine.string(),
	})
);
