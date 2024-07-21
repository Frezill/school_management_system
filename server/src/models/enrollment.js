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
        }
    };
    Enrollment.init({

        student_id: DataTypes.INTEGER,
        subject_id: DataTypes.INTEGER,
        score: DataTypes.DECIMAL(1, 1),
        completed: { type: DataTypes.BOOLEAN, defaultValue: false },
        attendance: DataTypes.TEXT('long'),
        semester_id: DataTypes.INTEGER

    }, {
        sequelize,
        modelName: 'Enrollment'

    });
    return Enrollment;
};