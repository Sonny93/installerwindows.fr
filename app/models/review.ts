import AppLightModel from '#models/app_light_model';
import Product from '#models/products';
import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';

export default class Review extends AppLightModel {
	@column()
	declare title: string;

	@column()
	declare url: string;

	@column()
	declare productId: number;

	@belongsTo(() => Product, {
		foreignKey: 'productId',
		localKey: 'id',
	})
	declare product: BelongsTo<typeof Product>;
}
