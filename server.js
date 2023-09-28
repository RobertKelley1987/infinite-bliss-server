if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Import required vars
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const apparelRoutes = require('./routes/apparel');
const accessoryRoutes = require('./routes/accessories');
const musicRoutes = require('./routes/music');
const artistRoutes = require('./routes/artists');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payment-intents');

// General config
app.use(express.json());
app.use(express.static('build'));
app.use(cors());

// Routing config
app.use('/apparel', apparelRoutes);
app.use('/accessories', accessoryRoutes);
app.use('/music', musicRoutes);
app.use('/artists', artistRoutes);
app.use('/orders', orderRoutes);
app.use('/payment-intents', paymentRoutes);

// Error handling
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.status).send({ errorMessage: error.message })
});

// Start serving
app.listen(process.env.PORT || 8080, () => console.log('The server listens...'));