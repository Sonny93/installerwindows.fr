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

interface BaseProductPayload {
	brand: string;
	reference: string;
	recommendedPrice: number;
	additionalInfo: string | null;
	affiliateLinks: AffiliateLink[];
	reviews: Review[];
}

interface MousePayload extends BaseProductPayload {
	wire: boolean;
	shape: PeriphShape;
	weight: number;
}

interface KeyboardPayload extends BaseProductPayload {
	size: KeyboardSize;
	switches: string;
}

interface MonitorPayload extends BaseProductPayload {
	size: number;
	resolution: string;
	refreshRate: number;
	panel: PeriphPanel;
	vesaSupport: boolean;
}

interface HeadsetPayload extends BaseProductPayload {
	type: PeriphType;
	connectivity: PeriphConnectivity;
	microphone: boolean;
}

interface EarphonePayload extends BaseProductPayload {
	wire: boolean;
	microOnWire: boolean;
}

interface MicrophonePayload extends BaseProductPayload {
	connectivity: PeriphConnectivity;
	microphoneType: PeriphMicrophone;
}

interface MousePadPayload extends BaseProductPayload {
	slideSpeed: MousePadSpeed;
	covering: boolean;
	size: string;
}

export class ProductRepository {
	private readonly modelMap: Record<ProductType, Models> = {
		headset: Headsets,
		keyboard: Keyboards,
		earphone: Earphones,
		monitor: Monitors,
		mouse: Mouses,
		mousepad: MousePads,
		microphone: Microphones,
	};

	async getCountPerCategory(): Promise<CountPerCategory> {
		const counts = await Promise.all(
			Object.entries(this.modelMap).map(async ([key, model]) => {
				const count = await this.getCount(model);
				return [key, count];
			})
		);

		return Object.fromEntries(counts) as CountPerCategory;
	}

	async getCount(model: Models): Promise<number> {
		const count = await model.query().count('id as count');
		return count[0].$extras.count ?? 0;
	}

	private async getById<T extends Models, U>(model: T, id: string): Promise<U> {
		const result = await this.preloadRelations(model.query().where('id', id));
		return SerializerService.serialize<typeof model, U>(result[0]);
	}

	async getHeadsetById(id: string): Promise<Headset> {
		return this.getById<typeof Headsets, Headset>(Headsets, id);
	}

	async getKeyboardById(id: string): Promise<Keyboard> {
		return this.getById<typeof Keyboards, Keyboard>(Keyboards, id);
	}

	async getEarphoneById(id: string): Promise<Earphone> {
		return this.getById<typeof Earphones, Earphone>(Earphones, id);
	}

	async getMicrophoneById(id: string): Promise<Microphone> {
		return this.getById<typeof Microphones, Microphone>(Microphones, id);
	}

	async getMonitorById(id: string): Promise<Monitor> {
		return this.getById<typeof Monitors, Monitor>(Monitors, id);
	}

	async getMousePadById(id: string): Promise<MousePad> {
		return this.getById<typeof MousePads, MousePad>(MousePads, id);
	}

	async getMouseById(id: string): Promise<Mouse> {
		return this.getById<typeof Mouses, Mouse>(Mouses, id);
	}

	private async createBaseProduct(
		payload: BaseProductPayload,
		imagePath: string,
		trx: any
	) {
		return await Product.create(
			{
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			},
			{ client: trx }
		);
	}

	private async createProduct<
		T extends Models,
		U,
		P extends BaseProductPayload,
	>(
		model: T,
		payload: P,
		imagePath: string,
		specificPayload: (productId: number) => Partial<P>
	): Promise<U> {
		return await db.transaction(async (trx) => {
			const product = await this.createBaseProduct(payload, imagePath, trx);
			const modelInstance = await model.create(
				{
					...specificPayload(product.id),
					productId: product.id,
				},
				{ client: trx }
			);
			return SerializerService.serialize<typeof model, U>(modelInstance as any);
		});
	}

	async createMouse(payload: MousePayload, imagePath: string): Promise<Mouse> {
		return this.createProduct<typeof Mouses, Mouse, MousePayload>(
			Mouses,
			payload,
			imagePath,
			() => ({
				wire: payload.wire,
				shape: payload.shape,
				weight: payload.weight,
			})
		);
	}

	async createKeyboard(
		payload: KeyboardPayload,
		imagePath: string
	): Promise<Keyboard> {
		return this.createProduct<typeof Keyboards, Keyboard, KeyboardPayload>(
			Keyboards,
			payload,
			imagePath,
			() => ({
				size: payload.size,
				switches: payload.switches,
			})
		);
	}

	async createMonitor(
		payload: MonitorPayload,
		imagePath: string
	): Promise<Monitor> {
		return this.createProduct<typeof Monitors, Monitor, MonitorPayload>(
			Monitors,
			payload,
			imagePath,
			() => ({
				size: payload.size,
				resolution: payload.resolution,
				refreshRate: payload.refreshRate,
				panel: payload.panel,
				vesaSupport: payload.vesaSupport,
			})
		);
	}

	async createHeadset(
		payload: HeadsetPayload,
		imagePath: string
	): Promise<Headset> {
		return this.createProduct<typeof Headsets, Headset, HeadsetPayload>(
			Headsets,
			payload,
			imagePath,
			() => ({
				type: payload.type,
				connectivity: payload.connectivity,
				microphone: payload.microphone,
			})
		);
	}

	async createEarphone(
		payload: EarphonePayload,
		imagePath: string
	): Promise<Earphone> {
		return this.createProduct<typeof Earphones, Earphone, EarphonePayload>(
			Earphones,
			payload,
			imagePath,
			() => ({
				wire: payload.wire,
				microOnWire: payload.microOnWire,
			})
		);
	}

	async createMicrophone(
		payload: MicrophonePayload,
		imagePath: string
	): Promise<Microphone> {
		return this.createProduct<
			typeof Microphones,
			Microphone,
			MicrophonePayload
		>(Microphones, payload, imagePath, () => ({
			connectivity: payload.connectivity,
			microphoneType: payload.microphoneType,
		}));
	}

	async createMousepad(
		payload: MousePadPayload,
		imagePath: string
	): Promise<MousePad> {
		return this.createProduct<typeof MousePads, MousePad, MousePadPayload>(
			MousePads,
			payload,
			imagePath,
			() => ({
				slideSpeed: payload.slideSpeed,
				covering: payload.covering,
				size: payload.size,
			})
		);
	}

	async getProductsByCategory(category: ProductType): Promise<Product[]> {
		const model = this.modelMap[category];
		if (!model) throw new Error('Invalid product category');

		const products = await this.preloadRelations(model.query());
		return SerializerService.arraySerialize<typeof model, Product>(products);
	}

	private async updateBaseProduct(
		id: string,
		payload: BaseProductPayload,
		imagePath: string,
		trx: any
	) {
		const product = await Product.findOrFail(id, { client: trx });
		await product
			.merge({
				brand: payload.brand,
				image: imagePath,
				reference: payload.reference,
				recommendedPrice: payload.recommendedPrice,
				additionalInfo: payload.additionalInfo,
				affiliateLinks: payload.affiliateLinks,
				reviews: payload.reviews,
			})
			.save();
		return product;
	}

	private async updateProduct<
		T extends Models,
		U,
		P extends BaseProductPayload,
	>(
		model: T,
		id: string,
		payload: P,
		imagePath: string,
		specificPayload: Partial<P>
	): Promise<U> {
		return await db.transaction(async (trx) => {
			await this.updateBaseProduct(id, payload, imagePath, trx);
			const instance = await model.findOrFail(
				{ productId: id },
				{ client: trx }
			);
			await instance.merge(specificPayload as any).save();
			return SerializerService.serialize<typeof model, U>(instance as any);
		});
	}

	async updateMouse(
		id: string,
		payload: MousePayload,
		imagePath: string
	): Promise<Mouse> {
		return this.updateProduct<typeof Mouses, Mouse, MousePayload>(
			Mouses,
			id,
			payload,
			imagePath,
			{
				wire: payload.wire,
				shape: payload.shape,
				weight: payload.weight,
			}
		);
	}

	async updateKeyboard(
		id: string,
		payload: KeyboardPayload,
		imagePath: string
	): Promise<Keyboard> {
		return this.updateProduct<typeof Keyboards, Keyboard, KeyboardPayload>(
			Keyboards,
			id,
			payload,
			imagePath,
			{
				size: payload.size,
				switches: payload.switches,
			}
		);
	}

	async updateMonitor(
		id: string,
		payload: MonitorPayload,
		imagePath: string
	): Promise<Monitor> {
		return this.updateProduct<typeof Monitors, Monitor, MonitorPayload>(
			Monitors,
			id,
			payload,
			imagePath,
			{
				size: payload.size,
				resolution: payload.resolution,
				refreshRate: payload.refreshRate,
				panel: payload.panel,
				vesaSupport: payload.vesaSupport,
			}
		);
	}

	async updateHeadset(
		id: string,
		payload: HeadsetPayload,
		imagePath: string
	): Promise<Headset> {
		return this.updateProduct<typeof Headsets, Headset, HeadsetPayload>(
			Headsets,
			id,
			payload,
			imagePath,
			{
				type: payload.type,
				connectivity: payload.connectivity,
				microphone: payload.microphone,
			}
		);
	}

	async updateEarphone(
		id: string,
		payload: EarphonePayload,
		imagePath: string
	): Promise<Earphone> {
		return this.updateProduct<typeof Earphones, Earphone, EarphonePayload>(
			Earphones,
			id,
			payload,
			imagePath,
			{
				wire: payload.wire,
				microOnWire: payload.microOnWire,
			}
		);
	}

	async updateMicrophone(
		id: string,
		payload: MicrophonePayload,
		imagePath: string
	): Promise<Microphone> {
		return this.updateProduct<
			typeof Microphones,
			Microphone,
			MicrophonePayload
		>(Microphones, id, payload, imagePath, {
			connectivity: payload.connectivity,
			microphoneType: payload.microphoneType,
		});
	}

	async updateMousepad(
		id: string,
		payload: MousePadPayload,
		imagePath: string
	): Promise<MousePad> {
		return this.updateProduct<typeof MousePads, MousePad, MousePadPayload>(
			MousePads,
			id,
			payload,
			imagePath,
			{
				slideSpeed: payload.slideSpeed,
				covering: payload.covering,
				size: payload.size,
			}
		);
	}

	private preloadRelations(query: ModelQueryBuilderContract<any>) {
		return query.preload('product');
	}
}
