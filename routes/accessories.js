const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../util/catch-async')
const accessories = require('../controllers/accessories');

router.get('/', catchAsync(accessories.findAll));
router.get('/new', catchAsync(accessories.findAll));
router.get('/products/:id', catchAsync(accessories.findById));
router.get('/:collectionName', catchAsync(accessories.findCollection));

module.exports = router;