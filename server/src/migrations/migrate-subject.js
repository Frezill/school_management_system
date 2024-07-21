'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Subject', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            tuition: {
                type: Sequelize.DECIMAL(15, 3)
            },
            number_of_credits: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.TEXT('long')
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
        await queryInterface.dropTable('Subject');
    }
};