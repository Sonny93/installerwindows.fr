import { DateTime } from 'luxon';

export const dateTimeSerializer = (value: DateTime | null) =>
	value ? value.setLocale('fr').toLocaleString(DateTime.DATE_MED) : null;
