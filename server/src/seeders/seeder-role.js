'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Role', [
            {
                name: 'Student',
                description: 'Student of university',
                createdAt: '2024-07-28 00:00:00',
                updatedAt: '2024-07-28 00:0:00',
            },
            {
                name: 'Instructor',
                description: 'Instructor of university',
                createdAt: '2024-07-28 00:00:00',
                updatedAt: '2024-07-28 00:0:00',
            },
            {
                name: 'Admin',
                description: 'Admin of university',
                createdAt: '2024-07-28 00:00:00',
                updatedAt: '2024-07-28 00:0:00',
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Role', null, {});
    }
};
