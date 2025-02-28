import { DateTime } from 'luxon';

export const dateTimeSerializer = (value: DateTime) =>
	value.setLocale('fr').toLocaleString(DateTime.DATE_FULL);
