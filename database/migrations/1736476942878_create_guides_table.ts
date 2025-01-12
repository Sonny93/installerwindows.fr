import { defaultTableFields } from '#database/default_table_fields';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class CreateGuidesTable extends BaseSchema {
	static tableName = 'guides';

	async up() {
		const exists = await this.schema.hasTable(CreateGuidesTable.tableName);
		if (exists) {
			return console.warn(
				`Table ${CreateGuidesTable.tableName} already exists.`
			);
		}

		this.schema.createTable(CreateGuidesTable.tableName, (table) => {
			table.string('title', 254).notNullable();
			table.string('slug', 254).notNullable().unique();
			table.text('thumbnail').notNullable();
			table.text('github_raw_url').notNullable();

			defaultTableFields(table);
		});
	}

	async down() {
		this.schema.dropTable(CreateGuidesTable.tableName);
	}
}
