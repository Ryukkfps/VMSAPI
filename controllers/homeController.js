const Home = require('../models/homeModel');

// Create a new home
exports.createHome = async (req, res) => {
  try {
    const home = new Home(req.body);
    await home.save();
    res.status(201).send(home);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all homes
exports.getAllHomes = async (req, res) => {
  try {
    const homes = await Home.find();
    res.status(200).send(homes);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single home by ID
exports.getHomeById = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) {
      return res.status(404).send();
    }
    res.status(200).send(home);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a home
exports.updateHome = async (req, res) => {
  try {
    const home = await Home.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!home) {
      return res.status(404).send();
    }
    res.status(200).send(home);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a home
exports.deleteHome = async (req, res) => {
  try {
    const home = await Home.findByIdAndDelete(req.params.id);
    if (!home) {
      return res.status(404).send();
    }
    res.status(200).send(home);
  } catch (error) {
    res.status(500).send(error);
  }
};
