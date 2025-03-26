import AppBaseModel from '#models/app_base_model';
import Product from '#models/products';
import type { PeriphConnectivity, PeriphMicrophone } from '#shared/types/index';
import { column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';

export default class Microphones extends AppBaseModel {
	@column()
	declare connectivity: PeriphConnectivity;

	@column()
	declare microphoneType: PeriphMicrophone;

	@column()
	declare productId: number;

	@hasOne(() => Product, {
		foreignKey: 'id',
		localKey: 'productId',
	})
	declare product: HasOne<typeof Product>;
}
