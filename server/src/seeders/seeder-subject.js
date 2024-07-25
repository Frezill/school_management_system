'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Subject', [
            {
                id: 'SUBJ-001',
                name: 'Philosophy',
                tuition: 1694,
                description: 'This course covers the fundamentals of philosophy.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-002',
                name: 'Art History',
                tuition: 997,
                description: 'This course covers the fundamentals of art history.',
                number_of_credits: 3
            },
            {
                id: 'SUBJ-003',
                name: 'General Biology I',
                tuition: 943,
                description: 'This course covers the fundamentals of general biology i.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-004',
                name: 'Literature',
                tuition: 1060,
                description: 'This course covers the fundamentals of literature.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-005',
                name: 'Anthropology',
                tuition: 1319,
                description: 'This course covers the fundamentals of anthropology.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-006',
                name: 'Calculus I',
                tuition: 1421,
                description: 'This course covers the fundamentals of calculus I.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-007',
                name: 'Anthropology',
                tuition: 1319,
                description: 'This course covers the fundamentals of anthropology.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-008',
                name: 'Anthropology',
                tuition: 1319,
                description: 'This course covers the fundamentals of anthropology.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-009',
                name: 'Anthropology',
                tuition: 1319,
                description: 'This course covers the fundamentals of anthropology.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-010',
                name: 'Anthropology',
                tuition: 1319,
                description: 'This course covers the fundamentals of anthropology.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-011',
                name: 'Philosophy',
                tuition: 1694,
                description: 'This course covers the fundamentals of philosophy.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-012',
                name: 'Art History',
                tuition: 997,
                description: 'This course covers the fundamentals of art history.',
                number_of_credits: 3
            },
            {
                id: 'SUBJ-013',
                name: 'General Biology I',
                tuition: 943,
                description: 'This course covers the fundamentals of general biology i.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-014',
                name: 'Literature',
                tuition: 1060,
                description: 'This course covers the fundamentals of literature.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-015',
                name: 'Anthropology',
                tuition: 1319,
                description: 'This course covers the fundamentals of anthropology.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-016',
                name: 'Philosophy',
                tuition: 1694,
                description: 'This course covers the fundamentals of philosophy.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-017',
                name: 'Art History',
                tuition: 997,
                description: 'This course covers the fundamentals of art history.',
                number_of_credits: 3
            },
            {
                id: 'SUBJ-018',
                name: 'General Biology I',
                tuition: 943,
                description: 'This course covers the fundamentals of general biology i.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-019',
                name: 'Literature',
                tuition: 1060,
                description: 'This course covers the fundamentals of literature.',
                number_of_credits: 4
            },
            {
                id: 'SUBJ-020',
                name: 'Anthropology',
                tuition: 1319,
                description: 'This course covers the fundamentals of anthropology.',
                number_of_credits: 4
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Subject', null, {});
    }
};
