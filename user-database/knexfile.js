require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    debug: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations"
    },
    ssl: true
  },
  production: {
    client: "pg",
    debug: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations"
    },
    ssl: true
  }
};
