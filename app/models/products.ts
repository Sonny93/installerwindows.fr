import AppLightModel from '#models/app_light_model';
import Review from '#models/review';
import { column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';

export default class Product extends AppLightModel {
	@column()
	declare brand: string;

	@column()
	declare reference: string;

	@column()
	declare image: string;

	@column()
	declare recommendedPrice: number;

	@column()
	declare affiliateLinks: string;

	@column()
	declare additionalInfo: string;

	@hasMany(() => Review, {
		foreignKey: 'productId',
		localKey: 'id',
	})
	declare reviews: HasMany<typeof Review>;
}
