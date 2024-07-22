'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Period', [
      {
        name: 'subject_registration',
        isActive: true
      },
      {
        name: 'pay_tuition',
        isActive: true
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Period', null, {});
  }
};
