'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tuition extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Tuition.belongsTo(models.User, { foreignKey: 'student_id' });
            Tuition.belongsTo(models.Semester, { foreignKey: 'semester_id' });
        }
    };
    Tuition.init({

        student_id: DataTypes.STRING,
        total_tuition: DataTypes.DECIMAL(15, 3),
        exemption: DataTypes.FLOAT,
        last_tuition: DataTypes.DECIMAL(15, 3),
        paid: { type: DataTypes.BOOLEAN, defaultValue: false },
        payment_date: DataTypes.DATE,
        due_date: DataTypes.DATE,
        semester_id: DataTypes.INTEGER

    }, {
        sequelize,
        modelName: 'Tuition'

    });
    return Tuition;
};