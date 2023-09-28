const fs = require('fs').promises;
const ExpressError = require('../server/util/express-error');

// All possible product types in the apparel category
const PRODUCT_TYPES = ['t-shirts', 'longsleeves', 'hoodies'];
// The product types tied to each collection
const COLLECTIONS_LIB = {
    't-shirts': ['T-Shirt'],
    'longsleeves': ['Longsleeve'],
    'hoodies': ['Hoodie']
}

// Helper to get all apparel and handle possible error
const getAllApparel = async () => {
    const apparelJson = await fs.readFile('./data/apparel.json');
    if(!apparelJson) {
        throw new ExpressError(500, 'Server error: please try again later.')
    }
    return JSON.parse(apparelJson);
}

// Get all existing apparel.
// Returns apparel array and all product types included for filtering.
module.exports.findAll = async (req, res) => {
    const apparel = await getAllApparel()
    const apparelTypes = apparel.map(item => item.productType);
    const uniqueApparelTypes = new Set(apparelTypes);
    res.status(200).send({ collection: apparel, collectionTypes: [...uniqueApparelTypes] });
}

// Find a collection of apparel by its name.
// Returns collection and all product types included for filtering.
module.exports.findCollection = async (req, res) => {
    const { collectionName } = req.params;
    if(!collectionName) {
        throw new ExpressError(400, 'Please provide a collection name to use this route.')
    }

    if(PRODUCT_TYPES.includes(collectionName)) {
        const apparel = await getAllApparel();
        const apparelTypes = COLLECTIONS_LIB[collectionName];
        const filteredApparel = apparel.filter(item => apparelTypes.includes(item.productType));
        res.status(200).send({ collection: filteredApparel, collectionTypes: apparelTypes });
    } else {
        throw new ExpressError(400, 'Collection not found');
    }
}

// Find all apparel labeled as 'featured' in db.
// Returns collection and all product types needed for filtering.
module.exports.findFeatured = async (req, res) => {
    const apparel = await getAllApparel();
    const featuredApparel = apparel.filter(item => item.featured);

    const apparelTypes = featuredApparel.map(item => item.productType);
    const uniqueApparelTypes = new Set(apparelTypes);
    res.status(200).send({ collection: featuredApparel, collectionTypes: [...uniqueApparelTypes]});
}

// Find one item using its id.
module.exports.findById = async (req, res) => {
    const { id } = req.params;
    if(!id) {
        throw new ExpressError(400, 'Please provide an id to use this route.')
    }
    const apparel = await getAllApparel();
    const foundItem = apparel.find(item => item.id === id);
    res.status(200).send({ item: foundItem });
}