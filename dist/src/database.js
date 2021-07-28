"use strict";
exports.__esModule = true;
exports.pool = void 0;
var dotenv_1 = require("dotenv");
var pg_1 = require("pg");
dotenv_1.config();
var pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});
exports.pool = pool;
//# sourceMappingURL=database.js.map