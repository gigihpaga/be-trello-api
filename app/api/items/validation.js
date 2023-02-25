// ...rest of the initial code omitted for simplicity.
const { body, validationResult, param } = require('express-validator');
const { Todos, Items } = require('../../db/models');
module.exports = {
    validateCreate: [
        // cek body name
        body('name').notEmpty().withMessage('name is required'),
        // cek body todoId
        body('todoId')
            .notEmpty()
            .withMessage('todoId is required')
            .bail()
            .isNumeric()
            .withMessage('todoId must be an integer')
            .bail()
            // jika body todoId tidak kosong dan berupa number maka, select ke table Todos
            .custom(async (value, { req }) => {
                const checking = await Todos.findOne({
                    where: { id: value },
                }).catch(() => {});
                if (checking === null) {
                    // jika id yang dicari tidak ada di DB maka return promise reject()
                    return Promise.reject(new Error());
                }
            })
            .withMessage('todoId is not found on table reference'),
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
        // cek param id
        param('id')
            .notEmpty()
            .withMessage('param id is required')
            .bail()
            .isNumeric()
            .withMessage('param id must be an integer')
            .bail()
            // jika param id tidak kosong dan berupa number maka, select ke table Items
            .custom(async (value, { req }) => {
                const checking = await Items.findOne({
                    where: { id: value },
                }).catch(() => {});
                if (checking === null) {
                    // jika id yang dicari tidak ada di DB maka return promise reject()
                    return Promise.reject(new Error());
                }
            })
            .withMessage('data with that id not found'),
        (req, res, next) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            // console.log('validateGetOne err : ', errors);
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
        // cek param id
        param('id')
            .notEmpty()
            .withMessage('param id is required')
            .bail()
            .isNumeric()
            .withMessage('param id must be an integer')
            .bail()
            // jika param id tidak kosong dan berupa number maka, select ke table Items
            .custom(async (value, { req }) => {
                const checking = await Items.findOne({
                    where: { id: value },
                }).catch(() => {});
                if (checking === null) {
                    // jika id yang dicari tidak ada di DB maka return promise reject()
                    return Promise.reject(new Error());
                }
            })
            .withMessage('data with that id not found'),
        // cek body name
        body('name').notEmpty().withMessage('name is required'),
        // cek body todoId
        body('todoId')
            .notEmpty()
            .withMessage('todoId is required')
            .bail()
            .isNumeric()
            .withMessage('todoId must be an integer')
            .bail()
            // jika body todoId tidak kosong dan berupa number maka, select ke table Todos
            .custom(async (value, { req }) => {
                const checking = await Todos.findOne({
                    where: { id: value },
                }).catch(() => {});
                if (checking === null) {
                    // jika id yang dicari tidak ada di DB maka return promise reject()
                    return Promise.reject(new Error());
                }
            })
            .withMessage('todoId is not found on table reference'),

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
    validateUpdateTodoId: [
        // cek param id
        param('id')
            .notEmpty()
            .withMessage('param id is required')
            .bail()
            .isNumeric()
            .withMessage('param id must be an integer')
            .bail()
            // jika param id tidak kosong dan berupa number maka, select ke table Items
            .custom(async (value, { req }) => {
                const checking = await Items.findOne({
                    where: { id: value },
                }).catch(() => {});
                if (checking === null) {
                    // jika id yang dicari tidak ada di DB maka return promise reject()
                    return Promise.reject(new Error());
                }
            })
            .withMessage('data with that id not found'),
        // cek body todoId
        body('targetTodoId')
            .notEmpty()
            .withMessage('targetTodoId is required')
            .bail()
            .isNumeric()
            .withMessage('targetTodoId must be an integer')
            .bail()
            // jika body targetTodoId tidak kosong dan berupa number maka, select ke table Todos
            .custom(async (value, { req }) => {
                const checking = await Todos.findOne({
                    where: { id: value },
                }).catch(() => {});
                if (checking === null) {
                    // jika id yang dicari tidak ada di DB maka return promise reject()
                    return Promise.reject(new Error());
                }
            })
            .withMessage('targetTodoId is not found on table reference'),

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
};
