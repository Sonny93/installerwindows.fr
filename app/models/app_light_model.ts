import {
	BaseModel,
	CamelCaseNamingStrategy,
	column,
} from '@adonisjs/lucid/orm';

export default class AppLightModel extends BaseModel {
	static namingStrategy = new CamelCaseNamingStrategy();
	serializeExtras = false;

	@column({ isPrimary: true })
	declare id: number;
}
