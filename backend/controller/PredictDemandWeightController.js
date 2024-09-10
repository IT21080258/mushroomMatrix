const PredictDemandWeight = require('../models/PredictDemandWeightModel');

// POST method to add a new demand prediction
exports.addPDW = async (req, res) => {
    const { district, memberCount } = req.body; // Destructure request body

    try {
        // Create a new instance of the PredictDemandWeight model
        const newPDW = new PredictDemandWeight({ district, memberCount });
        const savedPDW = await newPDW.save(); // Save to database
        res.status(201).json(savedPDW); // Respond with the saved document
    } catch (error) {
        res.status(500).json({ error: "Cannot create Predict Demand Weight" }); // Handle errors
    }
};

// GET method to retrieve all demand predictions
exports.getAllPDW = async (req, res) => {
    try {
        const getPDW = await PredictDemandWeight.find(); // Fetch all documents
        res.json(getPDW); // Respond with the fetched documents
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
};

// DELETE method to remove a demand prediction by ID
exports.deletePDW = async (req, res) => {
    const PDWid = req.params.id; // Get ID from request parameters
    try {
        const deletePDW = await PredictDemandWeight.findByIdAndDelete(PDWid); // Delete document
        if (!deletePDW) {
            return res.status(404).json({ message: "Predict Demand Weight not found" }); // Handle not found case
        }
        res.json({ message: "Predict Demand Weight successfully removed" }); // Respond with success message
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
};

// UPDATE method to modify a demand prediction by ID
exports.updatedPDW = async (req, res) => {
    const PDWid = req.params.id; // Get ID from request parameters
    const { district, memberCount } = req.body; // Destructure request body
    try {
        const updatedPDW = await PredictDemandWeight.findByIdAndUpdate(
            PDWid,
            { district, memberCount }, // Fields to update
            { new: true, runValidators: true } // Return updated document and validate
        );
        if (!updatedPDW) {
            return res.status(404).json({ message: "Predict Demand Weight not found" }); // Handle not found case
        }
        res.json(updatedPDW); // Respond with the updated document
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
};