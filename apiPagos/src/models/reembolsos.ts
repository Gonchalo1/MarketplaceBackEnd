import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/db'; // Importa la instancia de Sequelize

// Definir los atributos del modelo de Reembolsos
interface ReembolsosAttributes {
  id: number;
  pago_id: number;
  monto: number;
  razon: string;
  estado: string;
  fecha_procesado: Date;
}

// Definir un tipo opcional para la creación del modelo (ya que id es auto-incremental)
interface ReembolsosCreationAttributes extends Optional<ReembolsosAttributes, 'id'> {}

// Definir el modelo con Sequelize y los atributos correspondientes
class Reembolsos extends Model<ReembolsosAttributes, ReembolsosCreationAttributes> implements ReembolsosAttributes {
  public id!: number;
  public pago_id!: number;
  public monto!: number;
  public razon!: string;
  public estado!: string;
  public fecha_procesado!: Date;
}

// Inicializar el modelo
Reembolsos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pago_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pagos', // Nombre de la tabla a la que se refiere
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
  },
  {
    sequelize, // La instancia de Sequelize
    tableName: 'reembolsos', // Nombre de la tabla
    timestamps: false, // Desactiva timestamps si no los necesitas
  }
);

export default Reembolsos;
