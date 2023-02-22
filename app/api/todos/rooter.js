const express = require('express');
const router = express.Router();

router.get('/todos', function (req, res, next) {
    res.json({ status: 200, message: 'Request in route todos' });
});

module.exports = router;
