const knex = require("knex");

const config = require("../knexfile.js");

const enviorment = process.env.DB_ENV || "development";

module.exports = knex(config[enviorment]);
