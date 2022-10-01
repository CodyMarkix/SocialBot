import { sequelize } from '../index';
import { DataTypes, Model } from 'sequelize';

export class User extends Model {}
User.init({
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }, {
    sequelize,
    modelName: 'User'
});
  