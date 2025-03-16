const OwnershipType = require('../models/ownershipTypeModel');

// Create a new ownership type
exports.createOwnershipType = async (req, res) => {
  try {
    const ownershipType = new OwnershipType(req.body);
    await ownershipType.save();
    res.status(201).send(ownershipType);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all ownership types
exports.getAllOwnershipTypes = async (req, res) => {
  try {
    const ownershipTypes = await OwnershipType.find();
    res.status(200).send(ownershipTypes);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single ownership type by ID
exports.getOwnershipTypeById = async (req, res) => {
  try {
    const ownershipType = await OwnershipType.findById(req.params.id);
    if (!ownershipType) {
      return res.status(404).send();
    }
    res.status(200).send(ownershipType);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an ownership type
exports.updateOwnershipType = async (req, res) => {
  try {
    const ownershipType = await OwnershipType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ownershipType) {
      return res.status(404).send();
    }
    res.status(200).send(ownershipType);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an ownership type
exports.deleteOwnershipType = async (req, res) => {
  try {
    const ownershipType = await OwnershipType.findByIdAndDelete(req.params.id);
    if (!ownershipType) {
      return res.status(404).send();
    }
    res.status(200).send(ownershipType);
  } catch (error) {
    res.status(500).send(error);
  }
};
