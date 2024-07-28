'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('User', [
            {
                id: 'A123456',
                first_name: 'Thanh Phat',
                last_name: 'Le',
                phone: '123456789',
                email: 'admin@gmail.com',
                password: '$2a$10$WVPuOIivUVI3Fxj/EPt6wuhQKn4jMZL8.g5h2CMxQ9000S8hNCGP2',
                address: 'Vi Thanh, Hau Giang, Viet Nam',
                dob: '2005-03-14 00:00:00',
                major_id: '1',
                role_id: '3',
                profileImage: 'seeseravt.jpg',
                createdAt: '2024-07-28 00:00:00',
                updatedAt: '2024-07-28 00:0:00',
                deletedAt: null
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('User', null, {});
    }
};
