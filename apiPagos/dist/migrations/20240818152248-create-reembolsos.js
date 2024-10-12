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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.createTable('Reembolsos', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            pago_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Pagos', // Nombre de la tabla a la que se refiere
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
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        });
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.dropTable('Reembolsos');
    })
};
