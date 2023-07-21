const express = require('express');
const router = express.Router();
const ZScoreController = require('../controller/ZScoreController');
const ROUTE_PREFIX = '/z-score'

router.post(ROUTE_PREFIX, ZScoreController.getZScoreData);

module.exports = router;
