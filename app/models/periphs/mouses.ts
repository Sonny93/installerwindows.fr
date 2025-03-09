import AppBaseModel from '#models/app_base_model';
import Product from '#models/products';
import type { PeriphShape } from '#shared/types/index';
import { column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';

export default class Mouses extends AppBaseModel {
	@column()
	declare wire: boolean;

	@column()
	declare shape: PeriphShape;

	@column()
	declare weight: number;

	@column()
	declare productId: number;

	@hasOne(() => Product, {
		foreignKey: 'id',
		localKey: 'productId',
	})
	declare product: HasOne<typeof Product>;
}
