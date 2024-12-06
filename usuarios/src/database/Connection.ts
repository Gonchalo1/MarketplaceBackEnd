import 'dotenv/config';
import pg from 'pg';
import userModel from '../models/userModel';
import { Sequelize } from 'sequelize';

const {
    DB_HOST = 'localhost',  
    DB_NAME,
    DB_USER = 'postgres',
    DB_PASS = '',
    DB_SCHEMA
} = process.env;


if (!DB_NAME) {
    throw new Error("La variable de entorno DB_NAME es obligatoria.");
}


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'postgres'
});

const { Client } = pg;

const createConnection = async () => {
    const client = new Client({
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS
    });

    await client.connect();

    if (DB_SCHEMA) {
        await client.query(`SET search_path TO ${DB_SCHEMA}`);
    }

    return client;
};


const User = userModel(sequelize);

export { sequelize, createConnection, User }; 
