import Earphones from '#models/periphs/earphones';
import Headsets from '#models/periphs/headsets';
import Keyboards from '#models/periphs/keyboards';
import Microphones from '#models/periphs/microphones';
import Monitors from '#models/periphs/monitors';
import MousePads from '#models/periphs/mouse_pads';
import Mouses from '#models/periphs/mouses';
import Product from '#models/products';
import {
	CountPerCategory,
	Earphone,
	Headset,
	Keyboard,
	Microphone,
	Monitor,
	Mouse,
	MousePad,
	ProductType,
} from '#shared/types/index';
import {
	ModelObject,
	ModelQueryBuilderContract,
} from '@adonisjs/lucid/types/model';

type Models =
	| typeof Headsets
	| typeof Keyboards
	| typeof Earphones
	| typeof Monitors
	| typeof Mouses
	| typeof MousePads
	| typeof Microphones;

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

	async getHeadset(): Promise<Headset[]> {
		const headsets = await this.preloadRelations(Headsets.query());
		return this.arraySerialize<Headsets, Headset>(headsets);
	}

	async getKeyboard(): Promise<Keyboard[]> {
		const keyboards = await this.preloadRelations(Keyboards.query());
		return this.arraySerialize<Keyboards, Keyboard>(keyboards);
	}

	async getEarphone(): Promise<Earphone[]> {
		const earphones = await this.preloadRelations(Earphones.query());
		return this.arraySerialize<Earphones, Earphone>(earphones);
	}

	async getMicrophone(): Promise<Microphone[]> {
		const microphones = await this.preloadRelations(Microphones.query());
		return this.arraySerialize<Microphones, Microphone>(microphones);
	}

	async getMonitor(): Promise<Monitor[]> {
		const monitors = await this.preloadRelations(Monitors.query());
		return this.arraySerialize<Monitors, Monitor>(monitors);
	}

	async getMousePad(): Promise<MousePad[]> {
		const mousepads = await this.preloadRelations(MousePads.query());
		return this.arraySerialize<MousePads, MousePad>(mousepads);
	}

	async getMouse(): Promise<Mouse[]> {
		const mouses = await this.preloadRelations(Mouses.query());
		return this.arraySerialize<Mouses, Mouse>(mouses);
	}

	async getProductsByCategory(category: ProductType): Promise<Product[]> {
		const model = this.getProductCategoryFromString(category);
		const products = await this.preloadRelations(model.query());
		return this.arraySerialize<Models, Product>(products);
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

	private arraySerialize<T extends ModelObject, Y>(array: T[]): Y[] {
		return array.map((item) => item.serialize() as Y);
	}

	private preloadRelations(query: ModelQueryBuilderContract<any>) {
		return query.preload('product', (product) => product.preload('reviews'));
	}
}
