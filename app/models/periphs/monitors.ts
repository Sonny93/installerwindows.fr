import BasePeriphModel from '#models/base_periph_model';
import type { PeriphPanel } from '#shared/types/index';
import { column } from '@adonisjs/lucid/orm';

export default class Monitors extends BasePeriphModel {
	@column()
	declare size: number;

	@column()
	declare resolution: string;

	@column()
	declare refreshRate: number;

	@column()
	declare panel: PeriphPanel;

	@column()
	declare vesa_support: boolean;
}
