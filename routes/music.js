const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../util/catch-async')
const music = require('../controllers/music');

router.get('/', catchAsync(music.findAll));
router.get('/new', catchAsync(music.findAll));
router.get('/featured', catchAsync(music.findFeatured));
router.get('/products/:id', catchAsync(music.findById));
router.get('/:collectionName', catchAsync(music.findCollection));

module.exports = router;