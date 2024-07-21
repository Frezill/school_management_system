'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Role, { foreignKey: 'role_id' });
            User.belongsTo(models.Major, { foreignKey: 'major_id' });
            User.hasMany(models.Tuition, { foreignKey: 'student_id' });
            User.belongsToMany(models.Subject, { through: models.Enrollment, foreignKey: 'student_id' });
            User.belongsToMany(models.Semester, { through: models.Enrollment, foreignKey: 'student_id' });
        }
    };
    User.init({
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        dob: DataTypes.DATE,
        major_id: DataTypes.INTEGER,
        role_id: DataTypes.INTEGER

    }, {
        sequelize,
        modelName: 'User',
        paranoid: true

    });
    return User;
};