// Update with your config settings.
var dotenv = require('dotenv').config();
const path = require('path');
const BASE_PATH = path.join(__dirname, 'server', 'db');

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: process.env.DB_DEV_NAME,
      host: '127.0.0.1',
      user: process.env.DB_DEV_USERNAME,
      password: process.env.DB_DEV_PASSWORD
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  test: {
    client: 'mysql2',
    connection: {
      database: process.env.DB_TEST_NAME,
      host: '127.0.0.1',
      user: process.env.DB_DEV_USERNAME,
      password: process.env.DB_DEV_PASSWORD
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  production: {
    client: 'mysql2',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
