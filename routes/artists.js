const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../util/catch-async')
const artists = require('../controllers/artists');

router.get('/:name', catchAsync(artists.findByName));

module.exports = router