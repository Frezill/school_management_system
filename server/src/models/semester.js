'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Semester extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Semester.hasMany(models.Tuition, { foreignKey: 'semester_id' });
            Semester.hasMany(models.Enrollment, { foreignKey: 'semester_id' });
        }
    };
    Semester.init({
        semester: DataTypes.STRING,
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Semester'

    });
    return Semester;
};