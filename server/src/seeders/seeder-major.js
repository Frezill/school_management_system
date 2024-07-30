'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Major', [
            {
                name: 'Information Security',
                year: '2023',
                createdAt: '2024-07-28 00:00:00',
                updatedAt: '2024-07-28 00:0:00',
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Major', null, {});
    }
};
