// Update with your config settings.
require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: 'mysql',
  connection: {
    user: 'avnadmin',
    password: process.env.SQL_PASSWORD,
    port: '23478',
    database: 'defaultdb',
    host: 'hairbie-shop-addoa350-448a.l.aivencloud.com',
  },
  seeds: {
    directory: './seed'
  }
};
export const staging = {
  client: 'mysql',
  connection: {
    user: 'avnadmin',
    password: process.env.SQL_PASSWORD,
    port: '23478',
    database: 'defaultdb',
    host: 'hairbie-shop-addoa350-448a.l.aivencloud.com',
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
    user: 'avnadmin',
    password: process.env.SQL_PASSWORD,
    port: '23478',
    database: 'defaultdb',
    host: 'hairbie-shop-addoa350-448a.l.aivencloud.com',
  },
  seeds: {
    directory: './seed'
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
