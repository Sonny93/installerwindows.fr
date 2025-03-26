import { defaultTableFields } from '#database/default_table_fields';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
	protected tableName = 'mouse_pads';

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.string('slide_speed').notNullable();
			table.boolean('covering').notNullable();
			table.string('size').notNullable();
			table.integer('product_id').notNullable();
			defaultTableFields(table);
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
