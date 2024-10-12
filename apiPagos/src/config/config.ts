import dotenv from 'dotenv';

// Asegúrate de que las variables de entorno están disponibles
dotenv.config();

interface DBConfig {
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
  host: string | undefined;
  dialect: 'postgres';
}

interface Config {
  development: DBConfig;
  test: DBConfig;
  production: DBConfig;
}

const config: Config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
};

export default config;
