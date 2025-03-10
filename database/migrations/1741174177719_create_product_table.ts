import { generateIdColumn } from '#database/default_table_fields';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
	protected tableName = 'products';

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.string('brand').notNullable();
			table.string('reference').notNullable();
			table.string('image').nullable();
			table.integer('recommended_price').notNullable();
			table.string('additional_info').nullable();
			table.jsonb('reviews').nullable();
			table.jsonb('affiliate_links').nullable();
			generateIdColumn(table);
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
