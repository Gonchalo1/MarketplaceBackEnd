import {Sequelize} from 'sequelize';
import DataTypes from 'sequelize'



module.exports = (sequelize: Sequelize) => {
    sequelize.define('User', {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false
        },
        username:{
            type: DataTypes.STRING,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {timestamps:false}
);
}


