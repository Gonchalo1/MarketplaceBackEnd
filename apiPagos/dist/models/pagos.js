"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/pagos.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db"); // Asegúrate de que la ruta sea correcta
class Pagos extends sequelize_1.Model {
}
// Inicializa el modelo
Pagos.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pedido_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    monto: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    metodo_pago: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha_transaccion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    detalles_transaccion: {
        type: sequelize_1.DataTypes.JSON, // O el tipo que prefieras
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize, // Instancia de sequelize
    modelName: 'Pagos',
});
// Exporta el modelo
exports.default = Pagos;
