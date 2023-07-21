const express = require('express');
const router = express.Router();
const navigation = require('./navigation')
const zScore = require('./zscore')

router.use('/api/v1', navigation);
router.use('/api/v1', zScore);

module.exports = router;
