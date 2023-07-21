const express = require('express');
const router = express.Router();
const NavigationTreeController = require('../controller/NavigationTreeController');
const ROUTE_PREFIX = '/navigation-tree'

router.get(ROUTE_PREFIX, NavigationTreeController.getNavigationTree);
router.get(`${ROUTE_PREFIX}/questions`, NavigationTreeController.getVariables);
router.get(`${ROUTE_PREFIX}/:id`, NavigationTreeController.getNavigationTreeById);
router.get(`${ROUTE_PREFIX}/questions/:id`, NavigationTreeController.getVariablesById);

module.exports = router;
