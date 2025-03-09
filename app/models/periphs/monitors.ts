import AppBaseModel from '#models/app_base_model';
import Product from '#models/products';
import type { PeriphPanel } from '#shared/types/index';
import { column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';

export default class Monitors extends AppBaseModel {
	@column()
	declare size: number;

	@column()
	declare resolution: string;

	@column()
	declare refreshRate: number;

	@column()
	declare panel: PeriphPanel;

	@column()
	declare vesa_support: boolean;

	@column()
	declare productId: number;

	@hasOne(() => Product, {
		foreignKey: 'id',
		localKey: 'productId',
	})
	declare product: HasOne<typeof Product>;
}
