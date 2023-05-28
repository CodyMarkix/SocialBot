import { DataTypes, Model, Sequelize } from 'sequelize';

class User extends Model {}

function declareModel(db: Sequelize) {
    User.init({
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        xp: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
        }, {
        sequelize: db,
        modelName: 'User'
    });
}

export {
    User,
    declareModel
};

export default {
    User,
    declareModel
};