'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Major extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Major.hasMany(models.User, { foreignKey: 'major_id', });
        }
    };
    Major.init({
        name: DataTypes.STRING,
        year: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'Major'

    });
    return Major;
};