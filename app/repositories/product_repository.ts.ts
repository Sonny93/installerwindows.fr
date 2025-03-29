import Earphones from '#models/periphs/earphones';
import Headsets from '#models/periphs/headsets';
import Keyboards from '#models/periphs/keyboards';
import Microphones from '#models/periphs/microphones';
import Monitors from '#models/periphs/monitors';
import MousePads from '#models/periphs/mouse_pads';
import Mouses from '#models/periphs/mouses';
import Product from '#models/products';
import { SerializerService } from '#services/serializer_service';
import {
	AffiliateLink,
	CountPerCategory,
	Earphone,
	Headset,
	Keyboard,
	KeyboardSize,
	Microphone,
	Monitor,
	Mouse,
	MousePad,
	MousePadSpeed,
	PeriphConnectivity,
	PeriphMicrophone,
	PeriphPanel,
	PeriphShape,
	PeriphType,
	ProductType,
	Review,
} from '#shared/types/index';
import db from '@adonisjs/lucid/services/db';
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model';

type Models =
	| typeof Headsets
	| typeof Keyboards
	| typeof Earphones
	| typeof Monitors
	| typeof Mouses
	| typeof MousePads
	| typeof Microphones;

type ProductPayload = {
	brand: string;
	reference: string;
	recommendedPrice: number;
	additionalInfo: string | null;
	affiliateLinks: AffiliateLink[];
	reviews: Review[];
};

type CreateMousePayload = ProductPayload & {
	wire: boolean;
	shape: PeriphShape;
	weight: number;
};

type CreateKeyboardPayload = ProductPayload & {
	size: KeyboardSize;
	switches: string;
};

type CreateMonitorPayload = ProductPayload & {
	size: number;
	resolution: string;
	refreshRate: number;
	panel: PeriphPanel;
	vesaSupport: boolean;
};

type CreateHeadsetPayload = ProductPayload & {
	type: PeriphType;
	connectivity: PeriphConnectivity;
	microphone: boolean;
};

type CreateEarphonePayload = ProductPayload & {
	wire: boolean;
	microOnWire: boolean;
};

type CreateMicrophonePayload = ProductPayload & {
	connectivity: PeriphConnectivity;
	microphoneType: PeriphMicrophone;
};

type CreateMousePadPayload = ProductPayload & {
	slideSpeed: MousePadSpeed;
	covering: boolean;
	size: string;
};

export class ProductRepository {
	async getCountPerCategory(): Promise<CountPerCategory> {
		const headsetCount = await this.getCount(Headsets);
		const keyboardCount = await this.getCount(Keyboards);
		const earphoneCount = await this.getCount(Earphones);
		const monitorCount = await this.getCount(Monitors);
		const mouseCount = await this.getCount(Mouses);
		const mousepadCount = await this.getCount(MousePads);
		const microphoneCount = await this.getCount(Microphones);

		return {
			headset: headsetCount,
			keyboard: keyboardCount,
			earphone: earphoneCount,
			monitor: monitorCount,
			mouse: mouseCount,
			mousepad: mousepadCount,
			microphone: microphoneCount,
		};
	}

	async getCount(model: Models): Promise<number> {
		const count = await model.query().count('id as count');
		return count[0].$extras.count ?? 0;
	}

	async getHeadsetById(id: string): Promise<Headset> {
		const headset = await this.preloadRelations(
			Headsets.query().where('id', id)
		);
		return SerializerService.serialize<Headsets, Headset>(headset[0]);
	}

	async getKeyboardById(id: string): Promise<Keyboard> {
		const keyboard = await this.preloadRelations(
			Keyboards.query().where('id', id)
		);
		return SerializerService.serialize<Keyboards, Keyboard>(keyboard[0]);
	}

	async getEarphoneById(id: string): Promise<Earphone> {
		const earphone = await this.preloadRelations(
			Earphones.query().where('id', id)
		);
		return SerializerService.serialize<Earphones, Earphone>(earphone[0]);
	}

	async getMicrophoneById(id: string): Promise<Microphone> {
		const microphone = await this.preloadRelations(
			Microphones.query().where('id', id)
		);
		return SerializerService.serialize<Microphones, Microphone>(microphone[0]);
	}

	async getMonitorById(id: string): Promise<Monitor> {
		const monitor = await this.preloadRelations(
			Monitors.query().where('id', id)
		);
		return SerializerService.serialize<Monitors, Monitor>(monitor[0]);
	}

	async getMousePadById(id: string): Promise<MousePad> {
		const mousepad = await this.preloadRelations(
			MousePads.query().where('id', id)
		);
		return SerializerService.serialize<MousePads, MousePad>(mousepad[0]);
	}

	async getMouseById(id: string): Promise<Mouse> {
		const mouse = await this.preloadRelations(Mouses.query().where('id', id));
		return SerializerService.serialize<Mouses, Mouse>(mouse[0]);
	}

	async createMouse(
		payload: CreateMousePayload,
		imagePath: string
	): Promise<Mouse> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.create(productPayload, { client: trx });

			const mousePayload = {
				wire: payload.wire,
				shape: payload.shape,
				weight: payload.weight,
				productId: product.id,
			};
			const mouse = await Mouses.create(mousePayload, { client: trx });
			return SerializerService.serialize<Mouses, Mouse>(mouse);
		});
	}

	async createKeyboard(
		payload: CreateKeyboardPayload,
		imagePath: string
	): Promise<Keyboard> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.create(productPayload, { client: trx });

			const keyboardPayload = {
				size: payload.size,
				switches: payload.switches,
				productId: product.id,
			};
			const keyboard = await Keyboards.create(keyboardPayload, { client: trx });
			return SerializerService.serialize<Keyboards, Keyboard>(keyboard);
		});
	}

	async createMonitor(
		payload: CreateMonitorPayload,
		imagePath: string
	): Promise<Monitor> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.create(productPayload, { client: trx });

			const monitorPayload = {
				size: payload.size,
				resolution: payload.resolution,
				refreshRate: payload.refreshRate,
				panel: payload.panel,
				vesa_support: payload.vesaSupport,
				productId: product.id,
			};
			const monitor = await Monitors.create(monitorPayload, { client: trx });
			return SerializerService.serialize<Monitors, Monitor>(monitor);
		});
	}

	async createHeadset(
		payload: CreateHeadsetPayload,
		imagePath: string
	): Promise<Headset> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.create(productPayload, { client: trx });

			const headsetPayload = {
				type: payload.type,
				connectivity: payload.connectivity,
				microphone: payload.microphone,
				productId: product.id,
			};
			const headset = await Headsets.create(headsetPayload, { client: trx });
			return SerializerService.serialize<Headsets, Headset>(headset);
		});
	}

	async createEarphone(
		payload: CreateEarphonePayload,
		imagePath: string
	): Promise<Earphone> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.create(productPayload, { client: trx });

			const earphonePayload = {
				wire: payload.wire,
				microOnWire: payload.microOnWire,
				productId: product.id,
			};
			const earphone = await Earphones.create(earphonePayload, { client: trx });
			return SerializerService.serialize<Earphones, Earphone>(earphone);
		});
	}

	async createMicrophone(
		payload: CreateMicrophonePayload,
		imagePath: string
	): Promise<Microphone> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.create(productPayload, { client: trx });

			const microphonePayload = {
				connectivity: payload.connectivity,
				microphoneType: payload.microphoneType,
				productId: product.id,
			};
			const microphone = await Microphones.create(microphonePayload, {
				client: trx,
			});
			return SerializerService.serialize<Microphones, Microphone>(microphone);
		});
	}

	async createMousepad(
		payload: CreateMousePadPayload,
		imagePath: string
	): Promise<MousePad> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.create(productPayload, { client: trx });

			const mousePadPayload = {
				slideSpeed: payload.slideSpeed,
				covering: payload.covering,
				size: payload.size,
				productId: product.id,
			};
			const mousePad = await MousePads.create(mousePadPayload, { client: trx });
			return SerializerService.serialize<MousePads, MousePad>(mousePad);
		});
	}

	async getProductsByCategory(category: ProductType): Promise<Product[]> {
		const model = this.getProductCategoryFromString(category);
		const products = await this.preloadRelations(model.query());
		return SerializerService.arraySerialize<Models, Product>(products);
	}

	getProductCategoryFromString(category: ProductType) {
		switch (category) {
			case 'headset':
				return Headsets;
			case 'keyboard':
				return Keyboards;
			case 'earphone':
				return Earphones;
			case 'monitor':
				return Monitors;
			case 'mouse':
				return Mouses;
			case 'mousepad':
				return MousePads;
			case 'microphone':
				return Microphones;
			default:
				throw new Error('Invalid product category');
		}
	}

	async updateMouse(
		id: string,
		payload: CreateMousePayload,
		imagePath: string
	): Promise<Mouse> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.findOrFail(id, { client: trx });
			await product.merge(productPayload).save();

			const mousePayload = {
				wire: payload.wire,
				shape: payload.shape,
				weight: payload.weight,
			};
			const mouse = await Mouses.findOrFail({ productId: id }, { client: trx });
			await mouse.merge(mousePayload).save();
			return SerializerService.serialize<Mouses, Mouse>(mouse);
		});
	}

	async updateKeyboard(
		id: string,
		payload: CreateKeyboardPayload,
		imagePath: string
	): Promise<Keyboard> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.findOrFail(id, { client: trx });
			await product.merge(productPayload).save();

			const keyboardPayload = {
				size: payload.size,
				switches: payload.switches,
			};
			const keyboard = await Keyboards.findOrFail(
				{ productId: id },
				{ client: trx }
			);
			await keyboard.merge(keyboardPayload).save();
			return SerializerService.serialize<Keyboards, Keyboard>(keyboard);
		});
	}

	async updateMonitor(
		id: string,
		payload: CreateMonitorPayload,
		imagePath: string
	): Promise<Monitor> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.findOrFail(id, { client: trx });
			await product.merge(productPayload).save();

			const monitorPayload = {
				size: payload.size,
				resolution: payload.resolution,
				refreshRate: payload.refreshRate,
				panel: payload.panel,
				vesa_support: payload.vesaSupport,
			};
			const monitor = await Monitors.findOrFail(
				{ productId: id },
				{ client: trx }
			);
			await monitor.merge(monitorPayload).save();
			return SerializerService.serialize<Monitors, Monitor>(monitor);
		});
	}

	async updateHeadset(
		id: string,
		payload: CreateHeadsetPayload,
		imagePath: string
	): Promise<Headset> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.findOrFail(id, { client: trx });
			await product.merge(productPayload).save();

			const headsetPayload = {
				type: payload.type,
				connectivity: payload.connectivity,
				microphone: payload.microphone,
			};
			const headset = await Headsets.findOrFail(
				{ productId: id },
				{ client: trx }
			);
			await headset.merge(headsetPayload).save();
			return SerializerService.serialize<Headsets, Headset>(headset);
		});
	}

	async updateEarphone(
		id: string,
		payload: CreateEarphonePayload,
		imagePath: string
	): Promise<Earphone> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.findOrFail(id, { client: trx });
			await product.merge(productPayload).save();

			const earphonePayload = {
				wire: payload.wire,
				microOnWire: payload.microOnWire,
			};
			const earphone = await Earphones.findOrFail(
				{ productId: id },
				{ client: trx }
			);
			await earphone.merge(earphonePayload).save();
			return SerializerService.serialize<Earphones, Earphone>(earphone);
		});
	}

	async updateMicrophone(
		id: string,
		payload: CreateMicrophonePayload,
		imagePath: string
	): Promise<Microphone> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.findOrFail(id, { client: trx });
			await product.merge(productPayload).save();

			const microphonePayload = {
				connectivity: payload.connectivity,
				microphoneType: payload.microphoneType,
			};
			const microphone = await Microphones.findOrFail(
				{ productId: id },
				{ client: trx }
			);
			await microphone.merge(microphonePayload).save();
			return SerializerService.serialize<Microphones, Microphone>(microphone);
		});
	}

	async updateMousepad(
		id: string,
		payload: CreateMousePadPayload,
		imagePath: string
	): Promise<MousePad> {
		return await db.transaction(async (trx) => {
			const productPayload = {
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			};
			const product = await Product.findOrFail(id, { client: trx });
			await product.merge(productPayload).save();

			const mousePadPayload = {
				slideSpeed: payload.slideSpeed,
				covering: payload.covering,
				size: payload.size,
			};
			const mousePad = await MousePads.findOrFail(
				{ productId: id },
				{ client: trx }
			);
			await mousePad.merge(mousePadPayload).save();
			return SerializerService.serialize<MousePads, MousePad>(mousePad);
		});
	}

	private preloadRelations(query: ModelQueryBuilderContract<any>) {
		return query.preload('product');
	}
}
