const express = require('express');
const router = express.Router();
const { getAll, create, getOne, update, destroy, updateTodoId } = require('./controller');

router.get('/items', getAll);
router.post('/items', create);
router.get('/items/:id', getOne);
router.put('/items/:id', update);
router.delete('/items/:id', destroy);
router.put('/items/:id/move', updateTodoId);

module.exports = router;
