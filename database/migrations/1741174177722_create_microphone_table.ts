import { defaultTableFields } from '#database/default_table_fields';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
	protected tableName = 'microphones';

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.string('connectivity').notNullable();
			table.string('microphone_type').notNullable();
			defaultTableFields(table);
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
