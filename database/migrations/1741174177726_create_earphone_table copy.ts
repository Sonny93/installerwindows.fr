import { defaultTableFields } from '#database/default_table_fields';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
	protected tableName = 'earphones';

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.boolean('wire').notNullable();
			table.boolean('micro_on_wire').notNullable();
			table.integer('product_id').notNullable();
			defaultTableFields(table);
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
