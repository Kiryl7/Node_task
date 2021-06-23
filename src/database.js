require('dotenv').config()
const { Pool } = require('pg')


const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
});

module.exports = pool