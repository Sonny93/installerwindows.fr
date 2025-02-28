import {
	BaseModel,
	CamelCaseNamingStrategy,
	column,
} from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';

const dateTimeSerializer = (value: DateTime) =>
	value.setLocale('fr').toLocaleString(DateTime.DATE_FULL);

export default class AppBaseModel extends BaseModel {
	static namingStrategy = new CamelCaseNamingStrategy();
	serializeExtras = true;

	@column({ isPrimary: true })
	declare id: number;

	@column.dateTime({
		autoCreate: true,
		serialize: dateTimeSerializer,
	})
	declare createdAt: DateTime;

	@column.dateTime({
		autoCreate: true,
		autoUpdate: true,
		serialize: dateTimeSerializer,
	})
	declare updatedAt: DateTime;
}
