import BasePeriphModel from '#models/base_periph_model';
import { column } from '@adonisjs/lucid/orm';

export default class Earphone extends BasePeriphModel {
	@column()
	declare wire: boolean;

	@column()
	declare micro_on_wire: boolean;
}
