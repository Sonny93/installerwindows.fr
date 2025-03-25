import { defaultTableFields } from '#database/default_table_fields';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
	protected tableName = 'headsets';

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.string('type').notNullable();
			table.string('connectivity').notNullable();
			table.boolean('microphone').notNullable();
			table.integer('product_id').notNullable();
			defaultTableFields(table);
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
