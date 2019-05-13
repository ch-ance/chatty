require("dotenv").config();

module.exports = {
  client: "pg",
  debug: true,
  connection: process.env.DB_URL,
  migrations: {
    directory: "./data/migrations"
  },
  ssl: true
};
