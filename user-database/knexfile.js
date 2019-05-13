require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_DEV_HOST || "localhost",
      database: process.env.DB_DEV_DATABASE || "rxid",
      user: process.env.DB_DEV_USER || "admin",
      password: "poop",
      port: "5432"
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  testing: {
    client: "pg",
    connection: {
      host: process.env.DB_TEST_HOST || "localhost",
      database: process.env.DB_TEST_DATABASE || "rxid",
      user: process.env.DB_TEST_USER || "admin",
      password: process.env.DB_TEST_PASSWORD || "pass",
      port: process.env.DB_TEST_PORT || "5432"
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
