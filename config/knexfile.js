// Update with your config settings.
const path = require("path");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config({ path: path.join(__dirname, "../.env") });

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      database: process.env.SQL_DATABASE,
      host: process.env.SQL_HOST,
      port: process.env.SQL_PORT,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seed",
    },
  },
  staging: {
    client: "mysql2",
    connection: {
      database: process.env.SQL_DATABASE,
      host: process.env.SQL_HOST,
      port: process.env.SQL_PORT,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
    },
    migrations: {
      tableName: "./migrations",
    },
    seeds: {
      directory: "./seed",
    },
  },
  production: {
    client: "mysql2",
    connection: {
      database: process.env.SQL_DATABASE,
      host: process.env.SQL_HOST,
      port: process.env.SQL_PORT,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
    },
    migrations: {
      tableName: "./migrations",
    },
    seeds: {
      directory: "./seed",
    },
  },
};
