const fs = require('fs').promises;
const ExpressError = require('../util/express-error');

// All possible accessory product types
const PRODUCT_TYPES = ['hats', 'bags', 'pins', 'patches'];
// The product types contained in each collection.
const COLLECTIONS_LIB = {
    'hats': ['Beanie', 'Cap'],
    'pins': ['Enamel Pin'],
    'bags': ['Tote Bag'],
    'patches': ['Patch']
}

// Helper to get all accessories and handle possible error
const getAllAccessories = async () => {
    const accessoriesJson = await fs.readFile('./data/accessories.json');
    if(!accessoriesJson) {
        throw new ExpressError(500, 'Server error: please try again later.')
    }
    return JSON.parse(accessoriesJson);
}

// Get all accessories
module.exports.findAll = async (req, res) => {
    const accessories = await getAllAccessories();
    const accessoryTypes = accessories.map(item => item.productType);
    const uniqueAccessoryTypes = new Set(accessoryTypes);
    res.status(200).send({ collection: accessories, collectionTypes: [...uniqueAccessoryTypes] });
}

// Find a collection of accessories by its name.
// Returns the collection and the any types needed for filtering.
// Ex: 'Hats' collection has beanies and caps, and user can filter by those types.
module.exports.findCollection = async (req, res) => {
    const { collectionName } = req.params;
    if(!collectionName) {
        throw new ExpressError(400, 'Please provide a collection name to use this route.')
    }

    if(PRODUCT_TYPES.includes(collectionName)) {
        const accessories = await getAllAccessories();
        const accessoryTypes = COLLECTIONS_LIB[collectionName];
        const filteredAccessories = accessories.filter(item => accessoryTypes.includes(item.productType));
        res.status(200).send({ collection: filteredAccessories, collectionTypes: accessoryTypes });
    } else {
        res.status(200).send({ error: 'Collection not found' });
    }
}

// Find one accessory by its id.
module.exports.findById = async (req, res) => {
    const { id } = req.params;
    if(!id) {
        throw new ExpressError(400, 'Please provide an id to use this route.')
    }

    const accessories = await getAllAccessories();
    const foundItem = accessories.find(item => item.id === id);
    res.status(200).send({ item: foundItem });
}