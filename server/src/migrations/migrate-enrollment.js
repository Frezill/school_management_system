'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Enrollment', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            student_id: {
                type: Sequelize.INTEGER
            },
            subject_id: {
                type: Sequelize.INTEGER
            },
            score: {
                type: Sequelize.DECIMAL(1, 1)
            },
            completed: {
                type: Sequelize.BOOLEAN
            },
            attendance: {
                type: Sequelize.TEXT('long')
            },
            semester_id: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Enrollment');
    }
};