import AppBaseModel from '#models/app_base_model';
import Review from '#models/review';
import { column, hasMany } from '@adonisjs/lucid/orm';
import { type HasMany } from '@adonisjs/lucid/types/relations';

export default class BasePeriphModel extends AppBaseModel {
	@column({ isPrimary: true })
	declare brand: string;

	@column()
	declare model: string;

	@hasMany(() => Review)
	declare reviews: HasMany<typeof Review>;

	@column()
	declare price: number;

	@column()
	declare notes: number;
}
