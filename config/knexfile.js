// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   },
  //   useNullAsDefault: true, // Required for SQLite
  // },
  
  development: {
    client: 'mysql',
    connection: {
      user: 'avnadmin',
      password: 'AVNS_bYjtQ-QU-cdAdbH6E-j',
      port: '23478',
      database: 'defaultdb',
      host: 'hairbie-shop-addoa350-448a.l.aivencloud.com',
    },
    seeds: {
      directory: './seed'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      user: 'avnadmin',
      password: 'AVNS_bYjtQ-QU-cdAdbH6E-j',
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
  }

};
