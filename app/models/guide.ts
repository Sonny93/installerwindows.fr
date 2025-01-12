import AppBaseModel from '#models/app_base_model';
import { column } from '@adonisjs/lucid/orm';

export default class Guide extends AppBaseModel {
	@column()
	declare title: string;

	@column()
	declare slug: string;

	@column()
	declare thumbnail: string;

	@column()
	declare githubRawUrl: string;
}
