// ...rest of the initial code omitted for simplicity.
const { body, validationResult, param } = require('express-validator');
const { Todos, Items } = require('../../db/models');
module.exports = {
    validateCreate: [
        // name name is require
        body('name').notEmpty().withMessage('name is required'),
        (req, res, next) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    statusText: 'Bad Request',
                    message:
                        'The server cannot or will not process the request due to something that is perceived to be a client error ',
                    errors: errors.array(),
                });
            }
            next();
        },
    ],
    validateGetOne: [
        param('id')
            .notEmpty()
            .withMessage('param id is required')
            .bail()
            .isNumeric()
            .withMessage('param id must be an integer')
            .bail()
            // jika param id tidak kosong dan berupa number maka, select ke table Todos
            .custom(async (value, { req, res }) => {
                const checking = await Todos.findOne({
                    where: { id: value },
                }).catch(() => {});
                // sengaja dikasih catch dengan object kosong, bertujuan jika ada error di luar dari validation
                // program tidak hanya berhenti di validation tetapi errornya akan di teruskan ke app
                // error tersebut akan di tangkap oleh app yang menangani khusus error
                if (checking === null) {
                    // jika id yang dicari tidak ada di DB maka return promise reject()
                    return Promise.reject(new Error());
                }
            })
            .withMessage('param id not found'),
        (req, res, next) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            console.log('On validate getOne errors empty : ', errors.isEmpty());
            console.log('On validate getOne errors isi : ', errors);
            // jika errornya ada dalam lingkup validation maka program akan mengeksekusi
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    statusText: 'Bad Request',
                    message:
                        'The server cannot or will not process the request due to something that is perceived to be a client error ',
                    errors: errors.array(),
                });
            }
            next();
        },
    ],
    validateUpdate: [
        param('id')
            .notEmpty()
            .withMessage('param id is required')
            .bail()
            .isNumeric()
            .withMessage('param id must be an integer')
            .bail()
            // jika param id tidak kosong dan berupa number maka, select ke table Todos
            .custom(async (value, { req }) => {
                const checking = await Todos.findOne({
                    where: { id: value },
                }).catch(() => {});
                // sengaja dikasih catch dengan object kosong, bertujuan jika ada error di luar dari validation
                // program tidak hanya berhenti di validation tetapi errornya akan di teruskan ke app
                // error tersebut akan di tangkap oleh app yang menangani khusus error
                if (checking === null) {
                    // jika id yang dicari tidak ada di DB maka return promise reject()
                    return Promise.reject(new Error());
                }
            })
            .withMessage('param id not found'),
        // name name is require
        body('name').notEmpty().withMessage('name is required'),
        (req, res, next) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            // console.log('ini error di validation update : ', errors);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    statusText: 'Bad Request',
                    message:
                        'The server cannot or will not process the request due to something that is perceived to be a client error ',
                    errors: errors.array(),
                });
            }
            next();
        },
    ],
    validateDestroy: [
        param('id')
            .notEmpty()
            .withMessage('param id is required')
            .bail()
            .isNumeric()
            .withMessage('param id must be an integer')
            .bail()
            // jika param id tidak kosong dan berupa number maka, select ke table Todos
            .custom(async (value, { req, res }) => {
                const checking = await Todos.findOne({
                    where: { id: value },
                }).catch(() => {});
                // sengaja dikasih catch dengan object kosong, bertujuan jika ada error di luar dari validation
                // program tidak hanya berhenti di validation tetapi errornya akan di teruskan ke app
                // error tersebut akan di tangkap oleh app yang menangani khusus error
                if (checking === null) {
                    // jika id yang dicari tidak ada di DB maka return promise reject()
                    return Promise.reject(new Error());
                }
            })
            .withMessage('param id not found')
            .bail()
            .custom(async (value, { req, res }) => {
                const checking = await Items.findAll({
                    where: { todoId: value },
                }).catch(() => {});
                // sengaja dikasih catch dengan object kosong, bertujuan jika ada error di luar dari validation
                // program tidak hanya berhenti di validation tetapi errornya akan di teruskan ke app
                // error tersebut akan di tangkap oleh app yang menangani khusus error
                if (checking?.length >= 1) {
                    // jika id yang dicari tidak ada di DB maka return promise reject()
                    return Promise.reject(new Error());
                }
            })
            // eslint-disable-next-line quotes
            .withMessage("can't delete todos, because todos has child items"),
        (req, res, next) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errorss = validationResult(req);
            console.log('On validate getOne errors empty : ', errorss.isEmpty());
            console.log('On validate getOne errors isi : ', errorss);
            // jika errornya ada dalam lingkup validation maka program akan mengeksekusi
            if (!errorss.isEmpty()) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    statusText: 'Bad Request',
                    message:
                        'The server cannot or will not process the request due to something that is perceived to be a client error ',
                    errors: errorss.array(),
                });
            }
            next();
        },
    ],
};
