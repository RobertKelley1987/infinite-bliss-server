const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../server/util/catch-async');
const orders = require('../controllers/orders');

router.post('/', catchAsync(orders.create));

module.exports = router;