const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// start endpoint url, hasilnya localhost: http://localhost:3000/api/v1
const URL = '/api/v1';
const todosRouter = require('./app/api/todos/rooter');
const itemsRouter = require('./app/api/items/rooter');

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

// untuk mengakses todos url endpoint/{namaFolder}, jadi http://localhost:3000/api/v1/todos
app.use(`${URL}`, todosRouter);
app.use(`${URL}`, itemsRouter);

// handle error 404
app.use(function (req, res, next) {
    const err = new Error('Unable to fulfill the request');
    err.ok = false;
    err.status = 404;
    err.statusText = 'Not Found';
    next(err);
});

// catch undefined errors
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    // tangkap message error
    res.locals.message = err.message;
    // cek env, jika development tampilkan errornya, jika testing || production maka message error tidak ditampilkan
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    const createRes = () => {
        const ok = err.ok ? err.ok : false;
        // console.log('ok : ', ok);
        const status = err.status ? err.status : 500;
        // eslint-disable-next-line prefer-const
        let statusText =
            [
                { stat: 200, statText: 'OK' },
                { stat: 201, statText: 'Created' },
                { stat: 400, statText: 'Bad Request' },
                { stat: 401, statText: 'Unauthorized' },
                { stat: 403, statText: 'Forbidden' },
                { stat: 404, statText: 'Not Found' },
                { stat: 422, statText: 'Unprocessable Entity' },
                { stat: 500, statText: 'Internal Server Error' },
                { stat: 502, statText: 'Bad Gateway' },
            ].find((val) => val.stat === status)?.statText || 'Internal Server Error';
        const message = err.message ? err.message : ''; // string new error taruh disini
        console.log('On App message : ', message);
        const responseText = err.responseText ? err.responseText : '';
        const data = err.data ? err.data : '';
        return {
            ok,
            status,
            statusText,
            message,
            response: {
                responseText,
                data,
            },
        };
    };

    res.status(err.status || 500).json(createRes(err));
    // eslint-disable-next-line no-debugger
    debugger;
});

module.exports = app;
