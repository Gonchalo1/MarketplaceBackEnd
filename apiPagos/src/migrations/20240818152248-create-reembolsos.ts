import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Reembolsos', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pago_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Pagos', // Nombre de la tabla a la que se refiere
          key: 'id', // Clave primaria de la tabla de referencia
        },
      },
      monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      razon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_procesado: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Reembolsos');
  }
};
