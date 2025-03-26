import AppBaseModel from '#models/app_base_model';
import Product from '#models/products';
import { column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';

export default class Earphones extends AppBaseModel {
	@column()
	declare wire: boolean;

	@column()
	declare microOnWire: boolean;

	@column()
	declare productId: number;

	@hasOne(() => Product, {
		foreignKey: 'id',
		localKey: 'productId',
	})
	declare product: HasOne<typeof Product>;
}
