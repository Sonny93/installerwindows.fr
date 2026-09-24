import { DateTime } from 'luxon';
import { test } from '@japa/runner';

import { dateTimeSerializer } from '#libs/date_time_serializer';

test.group('dateTimeSerializer', () => {
	test('should format a DateTime as a French medium date', ({ assert }) => {
		const value = DateTime.fromISO('2024-01-15T00:00:00.000Z', { zone: 'utc' });

		assert.equal(dateTimeSerializer(value), '15 janv. 2024');
	});

	test('should return null when given null', ({ assert }) => {
		assert.isNull(dateTimeSerializer(null));
	});
});
