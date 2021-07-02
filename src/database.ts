import { config } from 'dotenv'
import { Pool } from 'pg'

config()

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
});

export { pool }
