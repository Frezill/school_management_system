'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Subject.hasMany(models.Enrollment, { foreignKey: 'subject_id' })
        }
    };
    Subject.init({
        name: DataTypes.STRING,
        tuition: DataTypes.DECIMAL(15, 3),
        number_of_credits: DataTypes.INTEGER,
        description: DataTypes.TEXT('long')
    }, {
        sequelize,
        modelName: 'Subject'
    });
    return Subject;
};