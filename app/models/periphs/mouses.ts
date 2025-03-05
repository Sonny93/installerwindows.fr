import BasePeriphModel from '#models/base_periph_model';
import type { PeriphShape } from '#shared/types/index';
import { column } from '@adonisjs/lucid/orm';

export default class Mouses extends BasePeriphModel {
	@column()
	declare wire: boolean;

	@column()
	declare shape: PeriphShape;

	@column()
	declare weight: number;
}
