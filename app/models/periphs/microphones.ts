import BasePeriphModel from '#models/base_periph_model';
import type { PeriphConnectivity, PeriphMicrophone } from '#shared/types/index';
import { column } from '@adonisjs/lucid/orm';

export default class Microphones extends BasePeriphModel {
	@column()
	declare connectivity: PeriphConnectivity;

	@column()
	declare microphone_type: PeriphMicrophone;
}
