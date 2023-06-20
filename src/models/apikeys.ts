import { DataTypes, Model, Sequelize } from 'sequelize';

class APIKeys extends Model {}

function declareModel(db: Sequelize) {
    APIKeys.init({
            keyOwner: {
                type: DataTypes.STRING,
                allowNull: false
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false
            },
            registrar: {
                type: DataTypes.STRING
            },
            registrationDate: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
        sequelize: db,
        modelName: 'APIKeys'
    });
}

export {
    APIKeys,
    declareModel
};

export default {
    APIKeys,
    declareModel
};