'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Semester', 'isActive',
            {
                type: Sequelize.BOOLEAN,
            },
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Semester');
    }
};