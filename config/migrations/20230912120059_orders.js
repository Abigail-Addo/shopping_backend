/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders', (table) => {
        table.increments('id').primary();
        table.integer('product_id').notNullable();
        table.integer('price').notNullable();
        table.integer('user_id').notNullable();
        table.integer('quantity').notNullable().defaultTo(1);
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('orders')
  
};
