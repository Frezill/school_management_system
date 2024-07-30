'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Period', [
      {
        name: 'subject_registration',
        isActive: true,
        createdAt: '2024-07-28 00:00:00',
        updatedAt: '2024-07-28 00:0:00',
      },
      {
        name: 'pay_tuition',
        isActive: true,
        createdAt: '2024-07-28 00:00:00',
        updatedAt: '2024-07-28 00:0:00',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Period', null, {});
  }
};
