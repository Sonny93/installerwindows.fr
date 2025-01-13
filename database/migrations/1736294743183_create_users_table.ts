import { defaultTableFields } from '#database/default_table_fields';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class CreateUsersTable extends BaseSchema {
	static tableName = 'users';

	async up() {
		const exists = await this.schema.hasTable(CreateUsersTable.tableName);
		if (exists) {
			return console.warn(
				`Table ${CreateUsersTable.tableName} already exists.`
			);
		}

		this.schema.createTable(CreateUsersTable.tableName, (table) => {
			table.string('name', 254).notNullable();
			table.string('nick_name', 254).nullable();
			table.text('avatar_url').notNullable();

			table.json('token').nullable();
			table.string('provider_id').notNullable();
			table
				.enum('provider_type', ['discord'])
				.notNullable()
				.defaultTo('discord');

			defaultTableFields(table);
		});
	}

	async down() {
		this.schema.dropTable(CreateUsersTable.tableName);
	}
}
