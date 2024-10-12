// src/models/pagos.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/db'; // Asegúrate de que la ruta sea correcta

class Pagos extends Model {
  public id!: number;
  public pedido_id!: string;
  public monto!: number;
  public metodo_pago!: string;
  public estado!: string;
  public fecha_transaccion!: Date;
  public detalles_transaccion!: string; // Ajusta según lo que necesites
}

// Inicializa el modelo
Pagos.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pedido_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  metodo_pago: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_transaccion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  detalles_transaccion: {
    type: DataTypes.JSON, // O el tipo que prefieras
    allowNull: true,
  },
}, {
  sequelize, // Instancia de sequelize
  modelName: 'Pagos',
});

// Exporta el modelo
export default Pagos;
