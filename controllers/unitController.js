const Unit = require('../models/unitModel');

// Create a new unit
exports.createUnit = async (req, res) => {
  try {
    const unit = new Unit(req.body);
    await unit.save();
    res.status(201).send(unit);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all units
exports.getAllUnits = async (req, res) => {
  try {
    const units = await Unit.find();
    res.status(200).send(units);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single unit by ID
exports.getUnitById = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);
    if (!unit) {
      return res.status(404).send();
    }
    res.status(200).send(unit);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a unit
exports.updateUnit = async (req, res) => {
  try {
    const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!unit) {
      return res.status(404).send();
    }
    res.status(200).send(unit);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a unit
exports.deleteUnit = async (req, res) => {
  try {
    const unit = await Unit.findByIdAndDelete(req.params.id);
    if (!unit) {
      return res.status(404).send();
    }
    res.status(200).send(unit);
  } catch (error) {
    res.status(500).send(error);
  }
};
