"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db"); // Importa la instancia de Sequelize
// Definir el modelo con Sequelize y los atributos correspondientes
class Reembolsos extends sequelize_1.Model {
}
// Inicializar el modelo
Reembolsos.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pago_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pagos', // Nombre de la tabla a la que se refiere
            key: 'id', // Clave primaria de la tabla de referencia
        },
    },
    monto: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    razon: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha_procesado: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize, // La instancia de Sequelize
    tableName: 'reembolsos', // Nombre de la tabla
    timestamps: false, // Desactiva timestamps si no los necesitas
});
exports.default = Reembolsos;
