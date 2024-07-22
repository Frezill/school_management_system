'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Enrollment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Enrollment.belongsTo(models.User, { foreignKey: 'user_id' });
            Enrollment.belongsTo(models.Subject, { foreignKey: 'subject_id' });
            Enrollment.belongsTo(models.Semester, { foreignKey: 'semester_id' });
        }
    };
    Enrollment.init({

        user_id: DataTypes.STRING,
        subject_id: DataTypes.STRING,
        score: DataTypes.FLOAT,
        completed: { type: DataTypes.BOOLEAN, defaultValue: false },
        attendance: DataTypes.TEXT('long'),
        semester_id: DataTypes.INTEGER

    }, {
        sequelize,
        modelName: 'Enrollment'

    });
    return Enrollment;
};