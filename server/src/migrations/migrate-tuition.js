'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Tuition', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            student_id: {
                type: Sequelize.STRING
            },
            total_tuition: {
                type: Sequelize.DECIMAL(15, 3)
            },
            exemption: {
                type: Sequelize.DECIMAL(1, 1)
            },
            last_tuition: {
                type: Sequelize.DECIMAL(15, 3)
            },
            paid: {
                type: Sequelize.BOOLEAN
            },
            payment_date: {
                type: Sequelize.DATE
            },
            due_date: {
                type: Sequelize.DATE
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
        await queryInterface.dropTable('Tuition');
    }
};