import { generateIdColumn } from '#database/default_table_fields';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
	protected tableName = 'reviews';

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.string('title').notNullable();
			table.string('url').notNullable();
			table.integer('product_id').notNullable();
			generateIdColumn(table);
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
