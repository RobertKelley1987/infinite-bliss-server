const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../server/util/catch-async')
const apparel = require('../controllers/apparel');

router.get('/', catchAsync(apparel.findAll));
router.get('/new', catchAsync(apparel.findAll));
router.get('/featured', catchAsync(apparel.findFeatured));
router.get('/products/:id', catchAsync(apparel.findById));
router.get('/:collectionName', catchAsync(apparel.findCollection));

module.exports = router;