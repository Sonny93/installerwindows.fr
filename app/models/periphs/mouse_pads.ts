import BasePeriphModel from '#models/base_periph_model';
import type { PeriphSize } from '#shared/types/index';
import { column } from '@adonisjs/lucid/orm';

export default class MousePads extends BasePeriphModel {
	@column()
	declare slide_speed: number;

	@column()
	declare covering: boolean;

	@column()
	declare size: PeriphSize;
}
