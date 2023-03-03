require('dotenv').config();
module.exports = {
    development: {
        username: 'root',
        password: null,
        database: 'dbclone_trello',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        dburl: process.env.DB_URL,
        dialect: 'mysql',
        dialectOptions: {
            ssl: { rejectUnauthorized: false },
        },
        define: {
            timestamps: true,
        },
    },
};
