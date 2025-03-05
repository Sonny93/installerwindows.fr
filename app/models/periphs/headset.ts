import BasePeriphModel from '#models/base_periph_model';
import type { PeriphConnectivity, PeriphType } from '#shared/types/index';
import { column } from '@adonisjs/lucid/orm';

export default class Headset extends BasePeriphModel {
	@column()
	declare wire: boolean;

	@column()
	declare type: PeriphType;

	@column()
	declare connectivity: PeriphConnectivity;

	@column()
	declare microphone: boolean;
}
