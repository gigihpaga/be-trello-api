const express = require('express');
const router = express.Router();
const { getAll, create, getOne, update, destroy } = require('./controller');
const { validateCreate, validateGetOne, validateUpdate, validateDestroy } = require('./validation');

router.get('/todos', getAll);
router.post('/todos', validateCreate, create);
router.get('/todos/:id', validateGetOne, getOne);
router.put('/todos/:id', validateUpdate, update);
router.delete('/todos/:id', validateDestroy, destroy);

module.exports = router;
