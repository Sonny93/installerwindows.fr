import { defaultTableFields } from '#database/default_table_fields';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
	protected tableName = 'monitors';

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.integer('size').notNullable();
			table.string('resolution').notNullable();
			table.integer('refresh_rate').notNullable();
			table.string('panel').notNullable();
			table.boolean('vesa_support').notNullable();
			table.integer('product_id').notNullable();
			defaultTableFields(table);
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
