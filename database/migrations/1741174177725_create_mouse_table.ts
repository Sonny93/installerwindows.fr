import { defaultTableFields } from '#database/default_table_fields';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
	protected tableName = 'mouses';

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.boolean('wire').notNullable();
			table.string('shape').notNullable();
			table.integer('weight').notNullable();
			table.integer('product_id').notNullable();
			defaultTableFields(table);
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
