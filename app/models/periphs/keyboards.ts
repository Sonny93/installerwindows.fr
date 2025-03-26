import AppBaseModel from '#models/app_base_model';
import Product from '#models/products';
import { KeyboardSize } from '#shared/types/index';
import { column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';

export default class Keyboards extends AppBaseModel {
	@column()
	declare size: KeyboardSize;

	@column()
	declare switches: string;

	@column()
	declare productId: number;

	@hasOne(() => Product, {
		foreignKey: 'id',
		localKey: 'productId',
	})
	declare product: HasOne<typeof Product>;
}
