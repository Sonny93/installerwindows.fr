import {
	BaseModel,
	CamelCaseNamingStrategy,
	column,
} from '@adonisjs/lucid/orm';

export default class Review extends BaseModel {
	static namingStrategy = new CamelCaseNamingStrategy();
	serializeExtras = true;

	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare title: string;

	@column()
	declare url: string;
}
