// ...rest of the initial code omitted for simplicity.
const { body, validationResult, param } = require('express-validator');
const { Todos } = require('../../db/models');
module.exports = {
    validateCreate: [
        // name name is require
        body('name').notEmpty().withMessage('name is required'),
        (req, res, next) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    status: 422,
                    message: 'error',
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
            .custom(async (value, { req }) => {
                const checking = await Todos.findOne({
                    where: { id: value },
                });
                if (checking === null) {
                    // jika id yang dicari tidak ada di DB maka return promise reject()
                    return Promise.reject(new Error());
                }
            })
            .withMessage('param id not found'),
        (req, res, next) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            // console.log('validateGetOne err : ', errors);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    status: 422,
                    message: 'error',
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
                });
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
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    status: 422,
                    message: 'error',
                    errors: errors.array(),
                });
            }
            next();
        },
    ],
};
