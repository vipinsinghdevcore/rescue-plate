const mongoose = require('mongoose');

// This is the Blueprint for a Food Donation
const foodSchema = new mongoose.Schema({
    restaurantName: { type: String, required: true },
    foodType: { type: String, required: true },
    quantity: { type: String, required: true },
    address: { type: String, required: true },
    pickupTime: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Export the model so server.js can use it
module.exports = mongoose.model('Food', foodSchema);