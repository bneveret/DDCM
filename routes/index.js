const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/campaign', require('./campaign'));
router.use('/encounter', require('./encounter'));

module.exports = router;