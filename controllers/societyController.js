const Society = require("../models/societyModel");

// Create a new society
exports.createSociety = async (req, res) => {
  try {
    const society = new Society(req.body);
    await society.save();
    res.status(201).send(society);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllCities = async (req, res) => {
  try {
    const cities = await Society.find().distinct("City");
    res.status(200).send(cities);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllSocietiesByCity = async (req, res) => {
  try {
    const societies = await Society.find({ City: req.body.city });
    res.status(200).send(societies);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getAllSocietiesbyAdmin = async (req, res) => {
  try {
    const societies = await Society.find({ AdminId: req.body.AdminId });
    res.status(200).send(societies);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get all societies
exports.getAllSocieties = async (req, res) => {
  try {
    const societies = await Society.find();
    res.status(200).send(societies);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single society by ID
exports.getSocietyById = async (req, res) => {
  try {
    const society = await Society.find({ AdminId: req.params.id });
    if (!society) {
      return res.status(404).send();
    }
    res.status(200).send(society);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a society
exports.updateSociety = async (req, res) => {
  try {
    const society = await Society.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!society) {
      return res.status(404).send();
    }
    res.status(200).send(society);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a society
exports.deleteSociety = async (req, res) => {
  try {
    const society = await Society.findByIdAndDelete(req.params.id);
    if (!society) {
      return res.status(404).send();
    }
    res.status(200).send(society);
  } catch (error) {
    res.status(500).send(error);
  }
};
