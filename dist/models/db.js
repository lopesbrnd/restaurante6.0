import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = fileURLToPath(import.meta.url);
dotenv.config({ path: path.join(__dirname, '../../.env') });
console.log(process.env.DB_HOST);
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gerenciamento_restaurante",
    port: 3306,
});
export default pool;
