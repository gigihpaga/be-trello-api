const express = require('express');
const router = express.Router();
const { getAll, create, getOne, update, destroy, updateTodoId } = require('./controller');
const {
    validateCreate,
    validateGetOne,
    validateUpdate,
    validateUpdateTodoId,
} = require('./validation');

router.get('/items', getAll);
router.post('/items', validateCreate, create);
router.get('/items/:id', validateGetOne, getOne);
router.put('/items/:id', validateUpdate, update);
router.delete('/items/:id', validateGetOne, destroy);
router.put('/items/:id/move', validateUpdateTodoId, updateTodoId);

module.exports = router;
