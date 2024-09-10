const mongoose = require('mongoose');

// Define the schema for Predict Demand Weight
const PredictDemandWeightSchema = new mongoose.Schema({
    district: {
        type: String,
        required: true // Ensure district is provided
    },
    memberCount: {
        type: Number, // Changed to Number for consistency
        required: true // Ensure member count is provided
    }
});

// Create a model from the schema
const PredictDemandWeight = mongoose.model('PredictDemandWeight', PredictDemandWeightSchema);

module.exports = PredictDemandWeight; // Export the model