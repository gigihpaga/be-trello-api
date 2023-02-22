'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         * Example:
         */
        await queryInterface.bulkInsert(
            'todos',
            [
                {
                    name: 'Analisis',
                    createdAt: '2020-02-02 02:56:21',
                    updatedAt: '2023-05-11 19:05:45',
                },
                {
                    name: 'Pengembangan perangakat lunak',
                    createdAt: '2023-07-26 23:08:11',
                    updatedAt: '2023-12-02 02:47:19',
                },
                {
                    name: 'Pengawas Kualitas',
                    createdAt: '2022-01-10 17:36:14',
                    updatedAt: new Date(),
                },
            ],

            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         * Example:
         */
        await queryInterface.bulkDelete('todos', null, {});
    },
};
