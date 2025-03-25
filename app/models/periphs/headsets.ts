import AppBaseModel from '#models/app_base_model';
import Product from '#models/products';
import type { PeriphConnectivity, PeriphType } from '#shared/types/index';
import { column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';

export default class Headsets extends AppBaseModel {
	@column()
	declare type: PeriphType;

	@column()
	declare connectivity: PeriphConnectivity;

	@column()
	declare microphone: boolean;

	@column()
	declare productId: number;

	@hasOne(() => Product, {
		foreignKey: 'id',
		localKey: 'productId',
	})
	declare product: HasOne<typeof Product>;
}
