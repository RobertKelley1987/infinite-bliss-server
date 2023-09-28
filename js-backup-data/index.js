const { apparel } = require('./apparel');
const { albums } = require('./albums');
const { accessories } = require('./accessories');

module.exports.data = [...apparel, ...albums, ...accessories];