/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.integer('transaction_id').notNullable();
        table.integer('order_id').notNullable;
        table.integer('amount').notNullable;
        table.string('status').notNullable;
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('transactions')
};
