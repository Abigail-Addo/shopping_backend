// Update with your config settings.
require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: 'mysql',
  connection: {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT,
    database: process.env.SQL_DATABASE,
    host: process.env.SQL_HOST,
  },
  seeds: {
    directory: './seed'
  }
};
export const staging = {
  client: 'mysql',
  connection: {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT,
    database: process.env.SQL_DATABASE,
    host: process.env.SQL_HOST,
  },
  seeds: {
    directory: './seed'
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
export const production = {
  client: 'mysql',
  connection: {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT,
    database: process.env.SQL_DATABASE,
    host: process.env.SQL_HOST,
  },
  seeds: {
    directory: './seed'
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
