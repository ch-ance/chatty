require("dotenv").config();
const knex = require("knex");
const config = require("../knexfile.js");

const dbEnvironment = process.env.DB_ENV || "production";

module.exports = knex(config[dbEnvironment]);
