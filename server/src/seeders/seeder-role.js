'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Role', [
            {
                name: 'Student',
                description: 'Student of university'
            },
            {
                name: 'Instructor',
                description: 'Instructor of university'
            },
            {
                name: 'Admin',
                description: 'Admin of university'
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Role', null, {});
    }
};
