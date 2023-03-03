'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         * Example:
         */
        await queryInterface.bulkInsert(
            'items',
            [
                {
                    name: 'Membuat specprog',
                    todoId: 1,
                    createdAt: '2023-03-26 22:08:15',
                    updatedAt: '2023-08-15 22:21:07',
                },
                {
                    name: 'Modifikasi ERD',
                    todoId: 1,
                    createdAt: '2022-12-10 22:45:14',
                    updatedAt: '2023-01-11 19:05:45',
                },
                {
                    name: 'Revisi skenario testing',
                    todoId: 3,
                    createdAt: '2023-09-02 02:56:19',
                    updatedAt: '2023-12-26 22:08:16',
                },
                {
                    name: 'Deploy API order',
                    todoId: 2,
                    createdAt: '2023-10-21 22:11:33',
                    updatedAt: '2023-12-26 06:13:03',
                },
                {
                    name: 'Modif Form Login',
                    todoId: 2,
                    createdAt: '2020-08-12 21:11:33',
                    updatedAt: new Date(),
                },
                {
                    name: 'Testing form pembayaran',
                    todoId: 3,
                    createdAt: '2023-12-02 02:56:19',
                    updatedAt: '2023-12-26 22:08:16',
                },
                {
                    name: 'Testing API order',
                    todoId: 2,
                    createdAt: '2023-10-21 22:11:33',
                    updatedAt: '2023-12-26 06:13:15',
                },
                {
                    name: 'Membuat specprog pengiriman barang',
                    todoId: 2,
                    createdAt: '2023-03-26T22:08:15.000Z',
                    updatedAt: '2023-02-24T03:53:11.000Z',
                },
                {
                    name: 'Deploy API order',
                    todoId: 2,
                    createdAt: '2023-10-21T22:11:33.000Z',
                    updatedAt: '2023-12-26T06:13:03.000Z',
                },
                {
                    name: 'Membuat flowcart transaksi order barang',
                    todoId: 1,
                    createdAt: '2023-02-24T02:52:48.000Z',
                    updatedAt: '2023-02-24T02:52:48.000Z',
                },
                {
                    name: 'Specprog order barang',
                    todoId: 3,
                    createdAt: '2023-02-24T03:11:42.000Z',
                    updatedAt: '2023-03-01T05:01:01.000Z',
                },
                {
                    name: 'Scenario testing pembayaran',
                    todoId: 2,
                    createdAt: '2023-02-24T03:19:43.000Z',
                    updatedAt: '2023-02-24T03:19:43.000Z',
                },
                {
                    name: 'Modifikasi ERD',
                    todoId: 3,
                    createdAt: '2023-02-24T04:13:26.000Z',
                    updatedAt: '2023-03-01T05:00:20.000Z',
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *  Example:
         */
        await queryInterface.bulkDelete('items', null, {});
    },
};
