const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const URL = '/api/v1'; // start endpoint url, hasilnya localhost: http://localhost:3000/api/v1
const todosRouter = require('./app/api/todos/rooter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.json({
        message: 'Welcome to api clone trello',
        version: '1.0',
    });
});

app.use(`${URL}`, todosRouter); // untuk mengakses todos url endpoint/{namaFolder}, jadi http://localhost:3000/api/v1/todos

module.exports = app;
