import BasePeriphModel from '#models/base_periph_model';
import type { PeriphSize } from '#shared/types/index';
import { column } from '@adonisjs/lucid/orm';

export default class Keyboard extends BasePeriphModel {
	@column()
	declare size: PeriphSize;

	@column()
	declare switches: string;
}
