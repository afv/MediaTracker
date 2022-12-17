import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('seen', (table) => {
        table.string('notes');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('seen', (table) => {
        table.dropColumn('notes');
    });
}
