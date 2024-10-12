import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/db'; // Asegúrate de que la ruta sea correcta
import argon2 from 'argon2';

// Definir los tipos para los atributos del modelo User
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  address: string;
  phone: string;
  register_date: Date;
}

// Definir los tipos para la creación y actualización de usuarios, permitiendo opcionales
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'register_date'> {}

// Crear una clase que extienda `Model` con los atributos definidos
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public address!: string;
  public phone!: string;
  public register_date!: Date;

  // Métodos personalizados o estáticos pueden ser añadidos aquí si es necesario
}

// Definir el modelo con Sequelize
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    register_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Conexión a la base de datos
    tableName: 'users',
    timestamps: false, // No agregar columnas createdAt y updatedAt
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password_hash) {
          user.password_hash = await argon2.hash(user.password_hash);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.password_hash) {
          user.password_hash = await argon2.hash(user.password_hash);
        }
      }
    }
  }
);

export default User;
