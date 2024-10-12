import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Función para asegurar que las variables de entorno están definidas
const getEnvVariable = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${key} no está definido en las variables de entorno`);
    }
    return value;
};

// Configuración de la base de datos
export const sequelize = new Sequelize(
    getEnvVariable('DB_NAME'),
    getEnvVariable('DB_USER'),
    getEnvVariable('DB_PASSWORD'),
    {
        host: getEnvVariable('DB_HOST'),
        dialect: 'postgres',
        logging: false,
    }
);

// Función para probar la conexión
export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};
