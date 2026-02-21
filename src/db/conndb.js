import { Sequelize } from "sequelize";
import pg from 'pg';
import dotenv from "dotenv"

dotenv.config()

// Carrega as variáveis de ambiente
// require('dotenv').config()

const { DB_DATABASE, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// Configuração mais explícita
const sequelize = new Sequelize({
    database: DB_DATABASE,
    username: DB_NAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    dialect: 'postgres',
    dialectModule: pg, // Passa o módulo pg explicitamente
    schema: 'public',
    timezone: '-03:00',
    dialectOptions: {
        statement_timeout: 20000
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default sequelize;