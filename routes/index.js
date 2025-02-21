const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/campaign', require('./campaign'));
router.use('/encounter', require('./encounter'));
router.use('/auth', require('./auth'));

module.exports = router;