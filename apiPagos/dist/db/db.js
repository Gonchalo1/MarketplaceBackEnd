"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Función para asegurar que las variables de entorno están definidas
const getEnvVariable = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${key} no está definido en las variables de entorno`);
    }
    return value;
};
// Configuración de la base de datos
exports.sequelize = new sequelize_1.Sequelize(getEnvVariable('DB_NAME'), getEnvVariable('DB_USER'), getEnvVariable('DB_PASSWORD'), {
    host: getEnvVariable('DB_HOST'),
    dialect: 'postgres',
    logging: false,
});
// Función para probar la conexión
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');
    }
    catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
});
exports.testConnection = testConnection;
