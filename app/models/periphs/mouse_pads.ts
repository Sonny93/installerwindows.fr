import AppBaseModel from '#models/app_base_model';
import Product from '#models/products';
import type { PeriphSize } from '#shared/types/index';
import { column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';

export default class MousePads extends AppBaseModel {
	@column()
	declare slide_speed: number;

	@column()
	declare covering: boolean;

	@column()
	declare size: PeriphSize;

	@column()
	declare productId: number;

	@hasOne(() => Product, {
		foreignKey: 'id',
		localKey: 'productId',
	})
	declare product: HasOne<typeof Product>;
}
