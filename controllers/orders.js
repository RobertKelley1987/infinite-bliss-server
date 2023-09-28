const fs = require('fs').promises;
const ExpressError = require('../util/express-error');
const { v4: uuid } = require('uuid');

// Create a new order and save to db for future processing and shipping
module.exports.create = async (req, res) => {
    try {
        // Create new order
        const { order } = req.body;
        if(!order) {
            throw new ExpressError(400, 'Please provide an order to use this route.');
        }
        const orderId = uuid();
        const newOrder = { id: orderId, ...order };

        // Add new order to list of all orders and save
        const jsonOrders = await fs.readFile('./data/orders.json');
        if(!jsonOrders) {
            throw new ExpressError(500, 'Server error: please try again later.');
        }
        const orders = JSON.parse(jsonOrders);
        orders.push(newOrder);
        const updatedOrders = JSON.stringify(orders);
        await fs.writeFile('./data/orders.json', updatedOrders);

        // Send back order num as confirmation
        res.status(200).send({ order: newOrder });
    } catch (err) {
        res.status(500).send({ error: 'There was an error processing your order.' });
    }
}