const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../util/catch-async')
const paymentIntents = require('../controllers/payment-intents');

router.post('/', catchAsync(paymentIntents.create));

module.exports = router;