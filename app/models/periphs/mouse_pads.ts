import AppBaseModel from '#models/app_base_model';
import Product from '#models/products';
import { MousePadSpeed } from '#shared/types/index';
import { column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';

export default class MousePads extends AppBaseModel {
	@column()
	declare slideSpeed: MousePadSpeed;

	@column()
	declare covering: boolean;

	@column()
	declare size: string;

	@column()
	declare productId: number;

	@hasOne(() => Product, {
		foreignKey: 'id',
		localKey: 'productId',
	})
	declare product: HasOne<typeof Product>;
}
