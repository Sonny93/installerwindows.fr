import { defaultTableFields } from '#database/default_table_fields';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
	protected tableName = 'keyboards';

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.string('size').notNullable();
			table.string('switches').notNullable();
			table.integer('product_id').notNullable();
			defaultTableFields(table);
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
