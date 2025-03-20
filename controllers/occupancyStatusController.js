const OccupancyStatus = require('../models/occupancyStatusModel');

// Create a new occupancy status
exports.createOccupancyStatus = async (req, res) => {
  try {
    const occupancyStatus = new OccupancyStatus(req.body);
    await occupancyStatus.save();
    res.status(201).send(occupancyStatus);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all occupancy statuses
exports.getAllOccupancyStatuses = async (req, res) => {
  try {
    const occupancyStatuses = await OccupancyStatus.find();
    res.status(200).send(occupancyStatuses);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single occupancy status by ID
exports.getOccupancyStatusById = async (req, res) => {
  try {
    const occupancyStatus = await OccupancyStatus.findById(req.params.id);
    if (!occupancyStatus) {
      return res.status(404).send();
    }
    res.status(200).send(occupancyStatus);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOccupancyStatusByOwnershipType = async (req, res) => {
  try {
    const occupancyStatus = await OccupancyStatus.find({ OTypeId: req.params.id });
    if (!occupancyStatus) {
      return res.status(404).send();
    }
    res.status(200).send(occupancyStatus);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an occupancy status
exports.updateOccupancyStatus = async (req, res) => {
  try {
    const occupancyStatus = await OccupancyStatus.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!occupancyStatus) {
      return res.status(404).send();
    }
    res.status(200).send(occupancyStatus);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an occupancy status
exports.deleteOccupancyStatus = async (req, res) => {
  try {
    const occupancyStatus = await OccupancyStatus.findByIdAndDelete(req.params.id);
    if (!occupancyStatus) {
      return res.status(404).send();
    }
    res.status(200).send(occupancyStatus);
  } catch (error) {
    res.status(500).send(error);
  }
};
