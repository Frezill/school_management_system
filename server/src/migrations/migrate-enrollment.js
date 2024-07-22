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
            user_id: {
                type: Sequelize.STRING
            },
            subject_id: {
                type: Sequelize.STRING
            },
            score: {
                type: Sequelize.FLOAT
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